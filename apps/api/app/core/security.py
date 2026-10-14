"""
Foundational security utilities and token constants for NyaySahayak 2.0.
"""

import secrets
import uuid


def generate_uuid() -> str:
    """Generate a standard UUID4 string."""
    return str(uuid.uuid4())


def generate_secure_token(byte_length: int = 32) -> str:
    """Generate a URL-safe cryptographically secure random token."""
    return secrets.token_urlsafe(byte_length)


# Security constants to be utilized during authentication implementation
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
