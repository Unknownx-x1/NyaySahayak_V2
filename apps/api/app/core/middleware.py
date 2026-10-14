"""
FastAPI middlewares for request correlation and performance timing.
"""

import time
import uuid

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response

from app.core.logging import get_logger, request_id_ctx

logger = get_logger("nyaysahayak.access")


class RequestCorrelationMiddleware(BaseHTTPMiddleware):
    """
    Extracts or generates an X-Request-ID header and binds it to contextvars.
    """

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        req_id = request.headers.get("X-Request-ID")
        if not req_id:
            req_id = str(uuid.uuid4())

        token = request_id_ctx.set(req_id)
        start_time = time.perf_counter()

        try:
            response = await call_next(request)
            duration_ms = round((time.perf_counter() - start_time) * 1000, 2)

            response.headers["X-Request-ID"] = req_id
            response.headers["X-Process-Time-Ms"] = str(duration_ms)

            # Avoid logging excessive health checks in info stream unless configured
            if not request.url.path.endswith("/health"):
                logger.info(
                    f"{request.method} {request.url.path} "
                    f"-> status={response.status_code} in {duration_ms}ms"
                )

            return response
        finally:
            request_id_ctx.reset(token)
