"""
Models package for NyaySahayak 2.0.
Exports all SQLAlchemy models for Alembic discovery and ORM relationships.
"""

from app.db.base import Base
from app.models.base import BaseEntity
from app.models.workspace import Workspace

__all__ = [
    "Base",
    "BaseEntity",
    "Workspace",
]
