"""
Integration tests for database models and base repository access.
"""

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.workspace import Workspace
from app.repositories.base import BaseRepository


@pytest.mark.asyncio
async def test_workspace_model_and_repository(test_db_session: AsyncSession):
    repo = BaseRepository[Workspace](Workspace)

    new_workspace = Workspace(
        name="Chambers of V. Sharma, Senior Advocate",
        slug="chambers-v-sharma",
        subscription_tier="CHAMBER_ENTERPRISE",
        storage_quota_bytes=107374182400,  # 100GB
    )

    created = await repo.create(test_db_session, new_workspace)
    assert created.id is not None
    assert created.name == "Chambers of V. Sharma, Senior Advocate"
    assert created.slug == "chambers-v-sharma"

    # Query back
    fetched = await repo.get_by_id(test_db_session, created.id)
    assert fetched is not None
    assert fetched.slug == "chambers-v-sharma"

    # List all
    all_workspaces = await repo.get_all(test_db_session)
    assert len(all_workspaces) >= 1

    # Delete
    deleted = await repo.delete(test_db_session, created.id)
    assert deleted is True
    post_delete = await repo.get_by_id(test_db_session, created.id)
    assert post_delete is None
