"""
Health service gathering operational telemetry from system components.
"""

import time
from datetime import UTC, datetime

from app.core.config import get_settings
from app.db.session import check_database_health
from app.schemas.health import CeleryStatus, DatabaseStatus, HealthResponse

# Module-level variable recording application start time
START_TIME = time.time()


class HealthService:
    """Service responsible for aggregating health and diagnostic telemetry."""

    @staticmethod
    async def get_system_health() -> HealthResponse:
        settings = get_settings()
        db_health = await check_database_health()

        # Database telemetry
        db_status = DatabaseStatus(
            connected=bool(db_health.get("connected", False)),
            latency_ms=db_health.get("latency_ms"),
            dialect=str(db_health.get("dialect", "unknown")),
            error=str(db_health.get("error")) if db_health.get("error") else None,
        )

        # Celery telemetry
        broker_protocol = (
            settings.REDIS_URL.split("://")[0] if "://" in settings.REDIS_URL else "unknown"
        )
        celery_status = CeleryStatus(
            configured=bool(settings.REDIS_URL),
            broker=f"{broker_protocol}://[configured]",
        )

        overall_status = "online" if db_status.connected else "degraded"
        uptime_seconds = round(time.time() - START_TIME, 2)

        return HealthResponse(
            status=overall_status,
            system=settings.PROJECT_NAME,
            version=settings.VERSION,
            environment=settings.ENVIRONMENT,
            timestamp=datetime.now(UTC).isoformat(),
            database=db_status,
            celery=celery_status,
            uptime_seconds=uptime_seconds,
            metadata={
                "debug": settings.DEBUG,
                "s3_endpoint": settings.S3_ENDPOINT_URL,
            },
        )
