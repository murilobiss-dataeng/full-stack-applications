"""Application configuration from environment variables."""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Settings:
    """Runtime settings. Defaults support local development without a .env file."""

    data_root: Path
    log_level: str
    postgres_dsn: str | None
    batch_id: str

    @classmethod
    def from_env(cls) -> Settings:
        env_root = os.getenv("COURTLYTICS_DATA_ROOT")
        if env_root:
            root = Path(env_root).resolve()
        else:
            root = Path(__file__).resolve().parents[2] / "data"
        return cls(
            data_root=root,
            log_level=os.getenv("LOG_LEVEL", "INFO").upper(),
            postgres_dsn=os.getenv("POSTGRES_DSN"),
            batch_id=os.getenv("ETL_BATCH_ID", "local-dev"),
        )


def get_settings() -> Settings:
    return Settings.from_env()
