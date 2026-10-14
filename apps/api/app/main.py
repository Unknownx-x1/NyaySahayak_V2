"""
Main FastAPI application entry point for NyaySahayak 2.0.
Configures lifespan events, middlewares, routers, and global exception handlers.
"""

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import api_v1_router
from app.api.v1.health import router as root_health_router
from app.core.config import get_settings
from app.core.logging import get_logger, setup_logging
from app.core.middleware import RequestCorrelationMiddleware
from app.db.session import engine

settings = get_settings()
setup_logging(log_level=settings.LOG_LEVEL, json_format=settings.LOG_JSON_FORMAT)
logger = get_logger("nyaysahayak.app")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan manager handling startup and shutdown events.
    """
    logger.info(
        f"Starting {settings.PROJECT_NAME} v{settings.VERSION} "
        f"[env={settings.ENVIRONMENT}, debug={settings.DEBUG}]"
    )
    yield
    logger.info(f"Shutting down {settings.PROJECT_NAME}... Disposing database connection pool.")
    await engine.dispose()
    logger.info("Shutdown completed cleanly.")


def create_application() -> FastAPI:
    """
    Factory function creating and configuring the FastAPI instance.
    """
    application = FastAPI(
        title=settings.PROJECT_NAME,
        description=(
            "NyaySahayak 2.0 — Verified Legal Intelligence & Courtroom Preparation Platform API. "
            "Engineered for high-provenance legal document analysis and adversarial sparring."
        ),
        version=settings.VERSION,
        lifespan=lifespan,
        docs_url="/docs" if settings.DEBUG or settings.ENVIRONMENT != "production" else None,
        redoc_url="/redoc" if settings.DEBUG or settings.ENVIRONMENT != "production" else None,
        openapi_url="/openapi.json"
        if settings.DEBUG or settings.ENVIRONMENT != "production"
        else None,
    )

    # 1. Request Correlation & Context Middleware
    application.add_middleware(RequestCorrelationMiddleware)

    # 2. CORS Middleware
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["X-Request-ID", "X-Process-Time-Ms"],
    )

    # 3. Root Level Health Endpoint for container orchestrators (e.g. Docker, Kubernetes)
    application.include_router(root_health_router, prefix="", tags=["health"])

    # 4. Versioned API Routes (/api/v1)
    application.include_router(api_v1_router, prefix=settings.API_V1_PREFIX)

    @application.get("/", tags=["root"])
    async def root_index() -> dict[str, str]:
        return {
            "name": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "status": "online",
            "health": "/health",
            "api_v1": f"{settings.API_V1_PREFIX}/health",
            "documentation": "/docs"
            if settings.DEBUG or settings.ENVIRONMENT != "production"
            else "disabled",
        }

    return application


app = create_application()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
