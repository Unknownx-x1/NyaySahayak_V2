"""
Integration tests verifying Alembic migrations upgrade and downgrade.
"""

import os

from alembic.config import Config

from alembic import command


def test_alembic_upgrade_downgrade(tmp_path):
    # Use temporary sqlite file for migration testing
    test_db_path = tmp_path / "migration_test.db"
    test_db_url = f"sqlite:///{test_db_path}"

    api_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    alembic_ini_path = os.path.join(api_dir, "alembic.ini")

    alembic_cfg = Config(alembic_ini_path)
    alembic_cfg.set_main_option("script_location", os.path.join(api_dir, "alembic"))
    alembic_cfg.set_main_option("sqlalchemy.url", test_db_url)

    # Set environment variable for env.py
    os.environ["SYNC_DATABASE_URL"] = test_db_url

    # Upgrade to head
    command.upgrade(alembic_cfg, "head")

    # Verify file was created
    assert os.path.exists(test_db_path)

    # Downgrade back to base
    command.downgrade(alembic_cfg, "base")
