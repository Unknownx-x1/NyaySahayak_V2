"""
SQLAlchemy model for Workspaces (the primary multi-tenant chamber boundary).
"""

from sqlalchemy import BigInteger, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import BaseEntity


class Workspace(BaseEntity):
    """
    Chamber, Law Firm, or Legal Department workspace.
    """

    __tablename__ = "workspaces"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    subscription_tier: Mapped[str] = mapped_column(
        String(50), default="CHAMBER_STANDARD", nullable=False
    )
    storage_quota_bytes: Mapped[int] = mapped_column(
        BigInteger, default=53687091200, nullable=False
    )  # 50GB
