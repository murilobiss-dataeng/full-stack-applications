"""End-to-end ETL: raw → processed (staging) → curated (warehouse-ready)."""

from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any

from src.processing.deduplication import flag_duplicates
from src.processing.entity_resolution import resolve_partner_entities
from src.processing.normalization import normalize_record_fields
from src.utils.config import get_settings
from src.utils.logger import get_logger

logger = get_logger(__name__)


class PipelineError(RuntimeError):
    pass


def _read_raw_partner_feed(raw_dir: Path, batch_id: str) -> list[dict[str, Any]]:
    """Bronze: ``partner_vendor_feed.json`` or per-batch ``partners_{batch}.json``."""
    candidates = [
        raw_dir / f"partners_{batch_id}.json",
        raw_dir / "partner_vendor_feed.json",
    ]
    path = next((p for p in candidates if p.exists()), None)
    if path is None:
        raise PipelineError(
            f"missing raw partner feed: tried {[str(p) for p in candidates]}",
        )
    doc = json.loads(path.read_text(encoding="utf-8"))
    records = doc.get("records", doc) if isinstance(doc, dict) else doc
    if not isinstance(records, list):
        raise PipelineError("partner feed payload must be a list or {records: []}")
    return records


def _validate_partner(rec: dict[str, Any], index: int) -> None:
    required = ("partner_id", "full_name")
    missing = [k for k in required if k not in rec or rec[k] in (None, "")]
    if missing:
        raise PipelineError(f"partner index {index} missing fields: {missing}")


def run_partner_pipeline(
    *,
    batch_id: str | None = None,
    data_root: Path | None = None,
) -> dict[str, Any]:
    """
    Incremental-style run: read raw batch, normalize, dedupe flags, resolve entities.

    Writes:
      - ``processed/partners_staging_{batch}.json``
      - ``curated/partners_curated_{batch}.json``
    """
    settings = get_settings()
    root = data_root or settings.data_root
    batch = batch_id or settings.batch_id
    raw_dir = root / "raw"
    processed_dir = root / "processed"
    curated_dir = root / "curated"
    processed_dir.mkdir(parents=True, exist_ok=True)
    curated_dir.mkdir(parents=True, exist_ok=True)

    start = time.perf_counter()
    logger.info("pipeline_start", extra={"batch_id": batch, "stage": "raw_read"})

    raw_records = _read_raw_partner_feed(raw_dir, batch)
    for i, rec in enumerate(raw_records):
        _validate_partner(rec, i)

    normalized = [normalize_record_fields(dict(r)) for r in raw_records]
    deduped = flag_duplicates(normalized)
    resolved = resolve_partner_entities(deduped)

    staging_path = processed_dir / f"partners_staging_{batch}.json"
    staging_path.write_text(json.dumps(resolved, indent=2), encoding="utf-8")

    curated_path = curated_dir / f"partners_curated_{batch}.json"
    curated_path.write_text(json.dumps(resolved, indent=2), encoding="utf-8")

    duration_ms = int((time.perf_counter() - start) * 1000)
    summary = {
        "batch_id": batch,
        "input_count": len(raw_records),
        "output_count": len(resolved),
        "staging_path": str(staging_path),
        "curated_path": str(curated_path),
        "duration_ms": duration_ms,
    }
    logger.info(
        "pipeline_complete",
        extra={
            "batch_id": batch,
            "stage": "curated",
            "record_count": len(resolved),
            "duration_ms": duration_ms,
        },
    )
    return summary
