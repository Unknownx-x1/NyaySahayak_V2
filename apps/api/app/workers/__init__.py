"""
Background workers package for NyaySahayak 2.0.
"""

from app.workers.celery_app import celery_app

__all__ = [
    "celery_app",
]
