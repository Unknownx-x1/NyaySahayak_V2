"""
Structured application logging module.
Supports contextual request IDs and optional JSON output format.
"""

import json
import logging
import sys
from contextvars import ContextVar
from datetime import UTC, datetime
from typing import Any

# Context variable for storing the current request ID across async tasks
request_id_ctx: ContextVar[str] = ContextVar("request_id_ctx", default="")


class StructuredFormatter(logging.Formatter):
    """
    Standard human-readable structured formatter that injects request ID into the message.
    """

    def format(self, record: logging.LogRecord) -> str:
        req_id = request_id_ctx.get()
        req_str = f" [req_id={req_id}]" if req_id else ""
        asctime = datetime.now(UTC).strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        return f"{asctime} | {record.levelname:<8} | {record.name}{req_str} : {record.getMessage()}"


class JSONFormatter(logging.Formatter):
    """
    JSON structured formatter for production and cloud log aggregators.
    """

    def format(self, record: logging.LogRecord) -> str:
        log_entry: dict[str, Any] = {
            "timestamp": datetime.now(UTC).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "request_id": request_id_ctx.get() or None,
            "source": f"{record.filename}:{record.lineno}",
        }
        if record.exc_info:
            log_entry["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_entry)


def setup_logging(log_level: str = "INFO", json_format: bool = False) -> None:
    """
    Configures the root logger and standard handlers with request ID support.
    """
    level = getattr(logging, log_level.upper(), logging.INFO)

    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(level)

    # Remove existing handlers to avoid duplicates
    for handler in list(root_logger.handlers):
        root_logger.removeHandler(handler)

    stream_handler = logging.StreamHandler(sys.stdout)
    stream_handler.setLevel(level)

    if json_format:
        stream_handler.setFormatter(JSONFormatter())
    else:
        stream_handler.setFormatter(StructuredFormatter())

    root_logger.addHandler(stream_handler)

    # Suppress overly chatty third-party loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)


def get_logger(name: str) -> logging.Logger:
    """Returns a named logger instance."""
    return logging.getLogger(name)
