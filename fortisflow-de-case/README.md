# Sigma Sec — Fortisflow case

**Sigma Sec** (fictional regulated manufacturing / supply-chain program) is **Murilo Biss**’s **Senior Data Engineer** portfolio case: **Snowflake-oriented** narrative in the Next.js app, a **governed `/api/metrics`** contract, **Infrastructure / Performance / Governance** hubs, and **Analytics + AI Lab** surfaces — aligned with how you present end-to-end data platform work to hiring teams.

This repository is a **monorepo** structured like **DoorRush** (`tax-ledger-analytics`) and **Courtlytics** (`courtlytics`): `web/` for the product, **`infra/`** for local Postgres + Terraform stubs + pipeline Docker image, and a **`data-platform/`** stub that validates the same metrics contract the UI consumes (extend with Python ELT/dbt when you want parity with the heavier cases).

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for how the pieces fit together.

## Repository layout

| Path | Description |
|------|-------------|
| `web/` | Next.js 14 (App Router), TypeScript, Tailwind, Recharts, `/api/metrics`, CV, AI Lab, Infrastructure hub |
| `data-platform/` | **Stub** Python package: validates mock metrics JSON vs the web contract; ready to grow into ETL + dbt like the other cases |
| `infra/` | `docker-compose.yml` (local Postgres), Terraform outline stubs, `Dockerfile.pipeline` for batch-style runs |

**CV (PDF)** lives under `web/public/cv-murilo-biss.pdf` (same print-oriented asset as DoorRush when synced from `tax-ledger-analytics`).

## Run the web app

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Metrics: [http://localhost:3000/api/metrics](http://localhost:3000/api/metrics).

## Run the data platform stub

```bash
cd data-platform
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
pytest
python -m src.pipeline
```

## Local Postgres (optional)

From repo root:

```bash
cd infra && docker compose up -d
# Postgres on localhost:5434 — user/db: sigmasec (dev password in compose file only)
```

Use this when you add real loaders or dbt tests against a throwaway warehouse.

## Production build

```bash
cd web && npm run build && npm start
```

## Deploy on Vercel

Vercel **Root Directory** must be the Next app folder (`web` if the Git root is this repo, or `fortisflow-de-case/web` if the repo root is `full-stack-applications`). See the table in `tax-ledger-analytics/README.md` for the same pattern.

Optional **`NEXT_PUBLIC_SITE_URL`** = canonical `https://…` for Open Graph.

## Makefile shortcuts

From the repository root:

```bash
make dev          # npm run dev in web/
make web-build    # production build
make test-data    # pytest in data-platform/
make infra-up     # docker compose up -d in infra/
```
