"""
Database engine and session management using SQLAlchemy 2.0.
"""

from collections.abc import AsyncGenerator

from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger("nyaysahayak.db")
settings = get_settings()


def get_async_database_url(url: str) -> str:
    """
    Ensures the connection URL uses an asynchronous driver for SQLAlchemy AsyncEngine.
    """
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    if url.startswith("postgresql+psycopg://"):
        # psycopg v3 async dialect
        return url
    if url.startswith("sqlite://") and not url.startswith("sqlite+aiosqlite://"):
        return url.replace("sqlite://", "sqlite+aiosqlite://", 1)
    return url


# Normalize URL
async_db_url = get_async_database_url(settings.DATABASE_URL)

# Configure engine kwargs
engine_kwargs = {
    "echo": settings.DEBUG,
}

if not async_db_url.startswith("sqlite"):
    engine_kwargs.update(
        {
            "pool_size": settings.DB_POOL_SIZE,
            "max_overflow": settings.DB_MAX_OVERFLOW,
            "pool_timeout": settings.DB_POOL_TIMEOUT,
            "pool_pre_ping": True,
        }
    )

# Global AsyncEngine and sessionmaker
engine: AsyncEngine = create_async_engine(async_db_url, **engine_kwargs)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI dependency yielding an async database session within a transaction context.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def check_database_health() -> dict[str, str | bool | float]:
    """
    Executes a lightweight ping to verify database connectivity.
    """
    import time

    start = time.perf_counter()
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(text("SELECT 1"))
            val = result.scalar()
            latency_ms = round((time.perf_counter() - start) * 1000, 2)
            is_healthy = val == 1
            return {
                "connected": is_healthy,
                "latency_ms": latency_ms,
                "dialect": engine.dialect.name,
            }
    except Exception as exc:
        latency_ms = round((time.perf_counter() - start) * 1000, 2)
        logger.warning(f"Database health check failed: {exc}")
        return {
            "connected": False,
            "error": str(exc),
            "latency_ms": latency_ms,
            "dialect": engine.dialect.name,
        }
