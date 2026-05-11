import json
from pathlib import Path

from src.pipeline.etl_pipeline import run_partner_pipeline


def test_pipeline_writes_curated(tmp_path: Path):
    raw = tmp_path / "raw"
    raw.mkdir()
    payload = {
        "records": [
            {"partner_id": "A1", "full_name": "John Smith"},
            {"partner_id": "A2", "full_name": "J. Smith"},
        ],
    }
    (raw / "partners_t1.json").write_text(json.dumps(payload), encoding="utf-8")

    summary = run_partner_pipeline(batch_id="t1", data_root=tmp_path)
    curated = Path(summary["curated_path"])
    assert curated.exists()
    data = json.loads(curated.read_text(encoding="utf-8"))
    assert len(data) == 2
    assert all("resolved_entity_id" in row for row in data)
