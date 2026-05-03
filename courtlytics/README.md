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

## Deploy on Vercel (`courtlytics-web`)

This repo is a **monorepo** (`web/` + `data-platform/`). Vercel must build the Next app from **`web`**, not the repository root.

1. **Project → Settings → General → Root Directory**  
   - If the Git root is the `courtlytics` folder: set **`web`**.  
   - If the Git root is `GitProjects` (or another parent): set **`full-stack-applications/courtlytics/web`** (adjust the path so it points at the folder that contains `next.config.mjs` and `package.json`).

2. **Project → Settings → General → Build & Output**  
   - **Framework Preset:** Next.js (auto-detected once Root Directory is `web`).  
   - **Output Directory:** leave **empty** (default). Do **not** set `dist`, `out`, or `.next` manually — wrong values cause a successful build but a **404 NOT_FOUND** at the edge.

3. Redeploy, then open the URL shown on the latest **Production** deployment (not an old preview hash unless you mean to).

If it still fails: open that deployment → **Building** logs and confirm `next build` ran inside `web/`.
