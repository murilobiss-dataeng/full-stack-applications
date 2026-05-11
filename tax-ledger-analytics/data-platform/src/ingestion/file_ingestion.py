"""Batch file ingestion from CSV/JSON drops into the raw zone."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from src.utils.logger import get_logger

logger = get_logger(__name__)


def ingest_json_file(src: Path, dest_dir: Path) -> Path:
    """Copy or validate JSON batch into ``raw/`` for downstream ETL."""
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / src.name
    shutil.copy2(src, dest)
    data = json.loads(dest.read_text(encoding="utf-8"))
    count = len(data) if isinstance(data, list) else len(data.get("records", []))
    logger.info(
        "file_ingestion_complete",
        extra={"stage": "raw", "record_count": count, "path": str(dest)},
    )
    return dest
