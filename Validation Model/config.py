import os
from pathlib import Path
from pydantic_settings import BaseSettings
from typing import List

# Base directory is always the folder that contains this file,
# regardless of where uvicorn is launched from.
_BASE_DIR = Path(__file__).parent


class Settings(BaseSettings):
    OCR_SPACE_API_KEY : str       = os.getenv("OCR_SPACE_API_KEY", "K86567801588957")
    API_SECRET_KEY    : str       = os.getenv("API_SECRET_KEY",    "change-me")
    REQUIRE_AUTH      : bool      = False
    MODEL_DIR         : str       = os.getenv("MODEL_DIR",  str(_BASE_DIR / "saved_models"))
    MODEL_NAME        : str       = os.getenv("MODEL_NAME", "best.pt")
    ALLOWED_ORIGINS   : List[str] = ["*"]
    OCR_ENGINE        : int       = 1       # Engine 1 supports Arabic + numbers
    OCR_LANGUAGE      : str       = "ara"   # handles Arabic text and digits
    OCR_RATE_LIMIT_S  : float     = 0.5
    DEFAULT_CONF      : float     = 0.4
    DEFAULT_PADDING   : int       = 5

    class Config:
        env_file = ".env"


settings = Settings()
os.makedirs(settings.MODEL_DIR, exist_ok=True)