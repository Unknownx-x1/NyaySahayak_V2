"""
Integration tests for /health and /api/v1/health endpoints.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_root_index_endpoint(async_client: AsyncClient):
    response = await async_client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "NyaySahayak 2.0 API"
    assert data["status"] == "online"
    assert "health" in data
    assert "api_v1" in data


@pytest.mark.asyncio
async def test_root_health_endpoint(async_client: AsyncClient):
    response = await async_client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "database" in data
    assert "celery" in data
    assert "uptime_seconds" in data
    assert data["version"] == "2.0.0"


@pytest.mark.asyncio
async def test_api_v1_health_endpoint(async_client: AsyncClient):
    response = await async_client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "database" in data
    assert "celery" in data
    assert "uptime_seconds" in data
    assert data["version"] == "2.0.0"


@pytest.mark.asyncio
async def test_request_id_and_timing_headers(async_client: AsyncClient):
    response = await async_client.get("/api/v1/health")
    assert response.status_code == 200
    assert "X-Request-ID" in response.headers
    assert "X-Process-Time-Ms" in response.headers
    assert len(response.headers["X-Request-ID"]) > 10
