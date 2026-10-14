"""
Celery worker configuration for asynchronous document processing and AI workflows.
"""

from celery import Celery

from app.core.config import get_settings

settings = get_settings()

celery_app = Celery(
    "nyaysahayak_workers",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=1800,  # 30-minute hard limit for multi-page OCR
    task_soft_time_limit=1500,  # 25-minute soft limit
    worker_prefetch_multiplier=1,  # Fair distribution among workers
)

# Auto-discover tasks across worker submodules in subsequent phases
celery_app.autodiscover_tasks(["app.workers"])
