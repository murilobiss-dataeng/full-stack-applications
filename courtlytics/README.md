# Courtlytics

**Legal Entity Resolution & Analytics Platform** — portfolio monorepo demonstrating senior-level data engineering (Python, PostgreSQL, S3-style zones, dbt under `src/dbt`) and a Next.js 14 product surface.

Earlier working titles included CourtSight AI; the product is now **Courtlytics** — court data, analytics, and resolved legal entities in one stack.

## Repository layout

| Path | Description |
|------|-------------|
| `web/` | Next.js 14 (App Router), TypeScript, Tailwind, Recharts, `/api/metrics` |
| `data-platform/` | Python ETL, ingestion, entity resolution, pytest, mock JSON under `data/raw` |

## Run the data platform

```bash
cd data-platform
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest
python -m src.pipeline
```

## Run the web app

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Metrics for charts: [http://localhost:3000/api/metrics](http://localhost:3000/api/metrics).

## Run production build

```bash
cd web && npm run build && npm start
```
