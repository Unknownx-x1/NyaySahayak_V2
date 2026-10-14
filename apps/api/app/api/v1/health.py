"""
Health check endpoints for load balancers and system monitoring.
"""

from fastapi import APIRouter, status

from app.schemas.health import HealthResponse
from app.services.health_service import HealthService

router = APIRouter(tags=["health"])


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="System Health Telemetry",
    description="Returns real-time health telemetry including database connectivity and worker status.",
)
async def get_health() -> HealthResponse:
    """
    Get system health, database connection latency, and environment details.
    """
    return await HealthService.get_system_health()
