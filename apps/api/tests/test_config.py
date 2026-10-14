"""
Unit tests for configuration validation and settings parsing.
"""

from app.core.config import Settings


def test_settings_defaults():
    settings = Settings()
    assert settings.PROJECT_NAME == "NyaySahayak 2.0 API"
    assert settings.VERSION == "2.0.0"
    assert settings.PORT == 8000
    assert isinstance(settings.CORS_ORIGINS, list)
    assert len(settings.CORS_ORIGINS) > 0


def test_cors_origins_comma_separated_string():
    settings = Settings(CORS_ORIGINS="http://localhost:3000, https://nyaysahayak.in")
    assert "http://localhost:3000" in settings.CORS_ORIGINS
    assert "https://nyaysahayak.in" in settings.CORS_ORIGINS
    assert len(settings.CORS_ORIGINS) == 2


def test_environment_override():
    settings = Settings(ENVIRONMENT="staging", DEBUG=True)
    assert settings.ENVIRONMENT == "staging"
    assert settings.DEBUG is True
