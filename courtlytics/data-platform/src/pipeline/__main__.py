"""Entry: ``python -m src.pipeline`` from the ``data-platform`` directory."""

import json

from src.pipeline.etl_pipeline import run_lawyer_pipeline

if __name__ == "__main__":
    print(json.dumps(run_lawyer_pipeline(), indent=2))
