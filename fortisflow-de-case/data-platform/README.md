# Sigma Sec — data platform (stub)

Python stub that **validates** the same metrics snapshot the Next.js app ships under `web/public/mock/pipeline-metrics.json`. Use it in CI to prove the “data plane” contract stays aligned with the UI.

**Extend** this folder toward full parity with `courtlytics/data-platform` or `tax-ledger-analytics/data-platform`:

- Add `data/raw/`, ingestion, and staging writers targeting **`infra/`** Postgres (`localhost:5434`).
- Add `src/dbt/` with models and tests; point `profiles.yml` at the local container.

## Commands

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest
python -m src.pipeline
```

Environment:

| Variable | Meaning |
|----------|---------|
| `SIGMA_SEC_MOCK_METRICS` | Override path to the JSON file (Dockerfile sets `/app/mock/pipeline-metrics.json`). |
