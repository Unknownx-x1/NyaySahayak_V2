"""
Generic repository base class using SQLAlchemy 2.0 AsyncSession.
"""

from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import Base


class BaseRepository[ModelType: Base]:
    """
    Base repository providing CRUD abstractions for database models.
    """

    def __init__(self, model: type[ModelType]):
        self.model = model

    async def get_by_id(self, session: AsyncSession, id: Any) -> ModelType | None:
        result = await session.execute(select(self.model).where(self.model.id == id))
        return result.scalar_one_or_none()

    async def get_all(
        self, session: AsyncSession, skip: int = 0, limit: int = 100
    ) -> list[ModelType]:
        result = await session.execute(select(self.model).offset(skip).limit(limit))
        return list(result.scalars().all())

    async def create(self, session: AsyncSession, entity: ModelType) -> ModelType:
        session.add(entity)
        await session.flush()
        await session.refresh(entity)
        return entity

    async def delete(self, session: AsyncSession, id: Any) -> bool:
        entity = await self.get_by_id(session, id)
        if entity:
            await session.delete(entity)
            await session.flush()
            return True
        return False
