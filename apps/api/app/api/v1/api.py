"""
Master API v1 router consolidating all domain endpoints.
"""

from fastapi import APIRouter

from app.api.v1.health import router as health_router

api_v1_router = APIRouter()

# Include versioned routers
api_v1_router.include_router(health_router, prefix="")
