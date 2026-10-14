"""
Pydantic schemas for health and system status endpoints.
"""

from typing import Any

from pydantic import BaseModel, Field


class DatabaseStatus(BaseModel):
    connected: bool = Field(..., description="Whether database connection is active")
    latency_ms: float | None = Field(None, description="Ping round-trip latency in milliseconds")
    dialect: str | None = Field(None, description="Database dialect in use")
    error: str | None = Field(None, description="Error message if connection failed")


class CeleryStatus(BaseModel):
    configured: bool = Field(..., description="Whether Celery broker URL is configured")
    broker: str = Field(..., description="Broker protocol or redacted URL")


class HealthResponse(BaseModel):
    status: str = Field(..., example="online")
    system: str = Field(default="NyaySahayak 2.0")
    version: str = Field(..., example="2.0.0")
    environment: str = Field(..., example="development")
    timestamp: str = Field(..., description="ISO 8601 UTC timestamp")
    database: DatabaseStatus
    celery: CeleryStatus
    uptime_seconds: float = Field(..., description="Seconds since server startup")
    metadata: dict[str, Any] = Field(default_factory=dict)
