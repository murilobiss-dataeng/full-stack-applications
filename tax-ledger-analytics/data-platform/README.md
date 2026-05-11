# DoorRush — Data Platform

Python ETL for **DoorRush**-style marketplace data: partner feeds, hubs, orders — **bronze → silver → gold** for tax and finance marts. Demo table names (`lawyers`, etc.) remain for a runnable repo; copy describes DoorRush merchants and logistics.

## Layout

- `src/ingestion`, `src/processing`, `src/pipeline`, `src/database`, `src/dbt/` (`tax_analytics`), `contracts/`, `data/raw|processed|curated`.

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
| `DOORRUSH_DATA_ROOT` | Override path to the `data/` directory |
| `TAX_ANALYTICS_DATA_ROOT` | Alias |
| `TAX_LEDGER_DATA_ROOT` | Legacy alias |
| `LOG_LEVEL` | Logging level (default `INFO`) |
| `ETL_BATCH_ID` | Batch suffix for output filenames |

## Outputs

Pipeline writes `processed/lawyers_staging_<batch>.json` and `curated/lawyers_curated_<batch>.json` (naming unchanged in code).
