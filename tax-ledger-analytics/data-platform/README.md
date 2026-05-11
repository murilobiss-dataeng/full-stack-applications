# Tax Analytics — Data Platform

Python pipelines that normalize, deduplicate, and resolve **counterparty-shaped** identities from raw feeds, simulating **bronze → silver → gold** suitable for **tax and finance** marts. The portfolio story uses a fictional marketplace anchor (**DoorRush** — not a real company).

## Layout

- `src/ingestion` — API and file landing to the raw zone.
- `src/processing` — Normalization, duplicate detection, fuzzy entity resolution.
- `src/pipeline` — Orchestrated ETL with logging and validation.
- `src/database` — PostgreSQL DDL documentation and a simulated warehouse client.
- `src/dbt/` — dbt project **`tax_analytics`**: seeds, models, tests, `schema.yml`.
- `contracts/` — JSON Schema for raw payloads.
- `data/raw|processed|curated` — Zone folders for demo datasets.

## Quick start

```bash
cd data-platform
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest
python -m src.pipeline
```

| Variable | Purpose |
|----------|---------|
| `TAX_ANALYTICS_DATA_ROOT` | Override path to the `data/` directory |
| `TAX_LEDGER_DATA_ROOT` | Legacy alias |
| `COURTLYTICS_DATA_ROOT` | Legacy alias |
| `LOG_LEVEL` | Logging level (default `INFO`) |
| `ETL_BATCH_ID` | Batch suffix for output filenames |

## Outputs

Running the pipeline produces `processed/lawyers_staging_<batch>.json` and `curated/lawyers_curated_<batch>.json` with `resolved_entity_id` attached to each row.
