"""Validate metrics mock contract (same file the Next.js app documents for demos)."""

from __future__ import annotations

import json
import os
from pathlib import Path


def resolve_mock_path() -> Path:
    env = os.environ.get("SIGMA_SEC_MOCK_METRICS", "").strip()
    if env:
        return Path(env)
    # data-platform/src/pipeline/__main__.py → parents[3] = monorepo root (fortisflow-de-case)
    root = Path(__file__).resolve().parents[3]
    return root / "web" / "public" / "mock" / "pipeline-metrics.json"


def load_contract() -> dict:
    path = resolve_mock_path()
    if not path.is_file():
        raise FileNotFoundError(f"Metrics mock not found: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def validate_contract(data: dict) -> None:
    """Minimum keys shared with web/src/lib/mockPipelineMetrics.ts narrative."""
    for key in ("batchId", "pipeline"):
        if key not in data:
            raise ValueError(f"Missing required key: {key}")
    pipe = data["pipeline"]
    for sub in ("stages", "lastRunDurationMs", "rowsProcessed", "validationPassRate"):
        if sub not in pipe:
            raise ValueError(f"Missing pipeline.{sub}")


def main() -> None:
    data = load_contract()
    validate_contract(data)
    batch = data.get("batchId", "?")
    print(f"sigma-sec stub pipeline OK (batch={batch})")


if __name__ == "__main__":
    main()
