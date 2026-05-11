"""End-to-end ETL: raw → processed (staging) → curated (warehouse-ready)."""

from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any

from src.processing.deduplication import flag_duplicates
from src.processing.entity_resolution import resolve_lawyer_entities
from src.processing.normalization import normalize_record_fields
from src.utils.config import get_settings
from src.utils.logger import get_logger

logger = get_logger(__name__)


class PipelineError(RuntimeError):
    pass


def _read_raw_lawyers(raw_dir: Path, batch_id: str) -> list[dict[str, Any]]:
    path = raw_dir / f"lawyers_{batch_id}.json"
    if not path.exists():
        alt = raw_dir / "lawyers.json"
        if alt.exists():
            path = alt
        else:
            raise PipelineError(f"missing raw lawyers file: {path}")
    doc = json.loads(path.read_text(encoding="utf-8"))
    records = doc.get("records", doc) if isinstance(doc, dict) else doc
    if not isinstance(records, list):
        raise PipelineError("lawyers payload must be a list or {records: []}")
    return records


def _validate_lawyer(rec: dict[str, Any], index: int) -> None:
    required = ("lawyer_id", "full_name")
    missing = [k for k in required if k not in rec or rec[k] in (None, "")]
    if missing:
        raise PipelineError(f"lawyer index {index} missing fields: {missing}")


def run_lawyer_pipeline(
    *,
    batch_id: str | None = None,
    data_root: Path | None = None,
) -> dict[str, Any]:
    """
    Incremental-style run: read raw batch, normalize, dedupe flags, resolve entities.

    Writes:
      - ``processed/lawyers_staging_{batch}.json``
      - ``curated/lawyers_curated_{batch}.json``
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

    raw_records = _read_raw_lawyers(raw_dir, batch)
    for i, rec in enumerate(raw_records):
        _validate_lawyer(rec, i)

    normalized = [normalize_record_fields(dict(r)) for r in raw_records]
    deduped = flag_duplicates(normalized)
    resolved = resolve_lawyer_entities(deduped)

    staging_path = processed_dir / f"lawyers_staging_{batch}.json"
    staging_path.write_text(json.dumps(resolved, indent=2), encoding="utf-8")

    curated_path = curated_dir / f"lawyers_curated_{batch}.json"
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
