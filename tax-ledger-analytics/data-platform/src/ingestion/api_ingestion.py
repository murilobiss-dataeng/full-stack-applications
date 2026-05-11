"""Simulated API ingestion: fetch structured payloads and persist to raw zone."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from src.utils.logger import get_logger

logger = get_logger(__name__)


def ingest_payload_to_raw(
    payload: dict[str, Any],
    *,
    raw_dir: Path,
    resource: str,
    batch_id: str,
) -> Path:
    """
    Write a single API response body to the raw landing zone (S3 analog: ``raw/``).

    In production this would be partitioned by ``ingest_date`` and ``source_system``.
    """
    raw_dir.mkdir(parents=True, exist_ok=True)
    path = raw_dir / f"{resource}_{batch_id}.json"
    body = {"batch_id": batch_id, "resource": resource, "records": payload.get("records", [])}
    path.write_text(json.dumps(body, indent=2), encoding="utf-8")
    logger.info(
        "api_ingestion_complete",
        extra={"batch_id": batch_id, "stage": "raw", "record_count": len(body["records"])},
    )
    return path
