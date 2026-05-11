# Tax Analytics

**Tax Analytics** is **Murilo Biss**’s Analytics Engineering portfolio: **semantic metrics** in SQL/dbt, **tested** pipelines, a **governed metrics API**, and a **BI-style** surface — framed with a fictional last-mile marketplace brand, **DoorRush** (DoorDash-class scale and ops; **not** a real company), as the narrative anchor for **UK / multi-entity tax mart** expansion.

The original scaffold was **Courtlytics** (legal entity resolution); this fork keeps the same runnable stack while the story focuses on **tax data, finance reporting, and self-service** for high-volume commerce.

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for how the data plane, dbt layer, web app, and infra folder fit together.

**CV (PDF)** is served from the web app at **`/cv-murilo-biss.pdf`** with a dedicated page at **`/cv`**.

## Repository layout

| Path | Description |
|------|-------------|
| `web/` | Next.js 14 (App Router), TypeScript, Tailwind, Recharts, `/api/metrics`, **CV page**, Governance & self-service lab |
| `data-platform/` | Python ETL, ingestion, entity resolution, pytest, mock JSON under `data/raw` |
| `infra/` | Terraform stubs, `docker-compose.yml` (local Postgres), sample `Dockerfile.pipeline` for batch jobs |

> **Folder name:** the directory may still be named `tax-ledger-analytics` in your tree; the **product name** in the app is **Tax Analytics** (`web/src/config/branding.ts`).

## Run the data platform

```bash
cd data-platform
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest
python -m src.pipeline
```

Optional: set `TAX_ANALYTICS_DATA_ROOT` to override the `data/` directory (legacy: `TAX_LEDGER_DATA_ROOT`, `COURTLYTICS_DATA_ROOT`).

## Run the web app

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). CV: [http://localhost:3000/cv](http://localhost:3000/cv). Metrics API: [http://localhost:3000/api/metrics](http://localhost:3000/api/metrics).

## Local Postgres (optional)

From `infra/`:

```bash
cd infra && docker compose up -d
# Postgres on localhost:5433 — user/db: taxanalytics
```

## Run production build

```bash
cd web && npm run build && npm start
```

## Deploy on Vercel (`tax-analytics-web`)

Monorepo: Vercel **Root Directory** = folder with `next.config.mjs` (e.g. `tax-ledger-analytics/web` if Git root is above this folder). Build: `npm run build`. Output directory: default (empty).

Optional env **`NEXT_PUBLIC_SITE_URL`** = canonical `https://…` URL.
