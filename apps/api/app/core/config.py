"""
Application configuration module using Pydantic Settings.
Validates environment variables at application startup.
"""

from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Core Environment
    ENVIRONMENT: str = Field(
        default="development", description="Environment: development, test, staging, production"
    )
    DEBUG: bool = Field(default=False, description="Debug mode flag")
    PROJECT_NAME: str = Field(default="NyaySahayak 2.0 API", description="Project display name")
    VERSION: str = Field(default="2.0.0", description="API version")
    API_V1_PREFIX: str = Field(default="/api/v1", description="Prefix for v1 routes")

    # Server Bindings
    HOST: str = Field(default="0.0.0.0", description="Host to bind")
    PORT: int = Field(default=8000, description="Port to bind")

    # CORS Configuration
    CORS_ORIGINS: list[str] = Field(
        default=["http://localhost:3000", "http://127.0.0.1:3000"],
        description="Allowed CORS origins list or comma-separated string",
    )

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str]:
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    # Database Configuration
    DATABASE_URL: str = Field(
        default="postgresql+psycopg://postgres:postgres@localhost:5432/nyaysahayak",
        description="Primary database URL for SQLAlchemy (async or sync compatible)",
    )
    SYNC_DATABASE_URL: str = Field(
        default="postgresql+psycopg://postgres:postgres@localhost:5432/nyaysahayak",
        description="Synchronous database URL for Alembic migrations",
    )
    DB_POOL_SIZE: int = Field(default=10, description="Database connection pool size")
    DB_MAX_OVERFLOW: int = Field(default=20, description="Maximum database overflow connections")
    DB_POOL_TIMEOUT: int = Field(default=30, description="Database pool timeout in seconds")

    # Redis Configuration
    REDIS_URL: str = Field(
        default="redis://localhost:6379/0",
        description="Redis connection URL for Celery and caching",
    )

    # Object Storage (MinIO / S3)
    S3_ENDPOINT_URL: str = Field(default="http://localhost:9000", description="S3 / MinIO endpoint")
    S3_ACCESS_KEY: str = Field(default="minioadmin", description="S3 access key")
    S3_SECRET_KEY: str = Field(default="minioadmin", description="S3 secret key")
    S3_BUCKET_NAME: str = Field(default="nyaysahayak-documents", description="S3 bucket name")
    S3_REGION: str = Field(default="ap-south-1", description="S3 region")

    # Logging
    LOG_LEVEL: str = Field(
        default="INFO", description="Log level: DEBUG, INFO, WARNING, ERROR, CRITICAL"
    )
    LOG_JSON_FORMAT: bool = Field(default=False, description="Emit logs as structured JSON")


@lru_cache
def get_settings() -> Settings:
    """Returns cached application settings instance."""
    return Settings()
