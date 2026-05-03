# Courtlytics Data Platform

Python pipelines that normalize, deduplicate, and resolve lawyer identities from raw legal datasets, simulating a production LegalTech bronze → silver → gold flow.

## Layout

- `src/ingestion` — API and file landing to the raw zone (S3 analog under `data/raw`).
- `src/processing` — Normalization, duplicate detection, fuzzy entity resolution.
- `src/pipeline` — Orchestrated ETL with logging and validation.
- `src/database` — PostgreSQL DDL documentation and a simulated warehouse client.
- `src/dbt/` — dbt project (`dbt_project.yml`, `models/`, schema tests). Run `dbt` with `--project-dir` pointing here after wiring warehouse profiles.
- `data/raw|processed|curated` — Zone folders for the demo datasets.

## Quick start

```bash
cd data-platform
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest
python -m src.pipeline
```

Environment variables (optional):

| Variable | Purpose |
|----------|---------|
| `COURTLYTICS_DATA_ROOT` | Override path to the `data/` directory |
| `LOG_LEVEL` | Logging level (default `INFO`) |
| `ETL_BATCH_ID` | Batch suffix for output filenames |

## Outputs

Running the pipeline produces `processed/lawyers_staging_<batch>.json` and `curated/lawyers_curated_<batch>.json` with `resolved_entity_id` attached to each row.
