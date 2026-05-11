# DoorRush — Tax Analytics

**DoorRush** (fictional last-mile marketplace — red/white identity, not a real company) is **Murilo Biss**’s Analytics Engineering portfolio: **semantic metrics** in SQL/dbt, **tested** pipelines, a **governed metrics API**, and a **BI-style** surface for **UK / multi-entity tax and operations** storytelling.

The codebase started from an earlier legal-entity demo scaffold; it is now fully reframed around **DoorRush** (fictional marketplace) and **tax / finance analytics** for this portfolio.

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for how the data plane, dbt layer, web app, and infra folder fit together.

**CV (PDF)** is served from the web app at **`/cv-murilo-biss.pdf`** with a dedicated page at **`/cv`**.

## Repository layout

| Path | Description |
|------|-------------|
| `web/` | Next.js 14 (App Router), TypeScript, Tailwind, Recharts, `/api/metrics`, **CV page**, Governance & self-service lab |
| `data-platform/` | Python ETL, ingestion, entity resolution, pytest, mock JSON under `data/raw` |
| `infra/` | Terraform stubs, `docker-compose.yml` (local Postgres), sample `Dockerfile.pipeline` for batch jobs |

> **Folder name:** the directory may still be named `tax-ledger-analytics` on disk; the **in-app brand** is configured in `web/src/config/branding.ts` (`SITE_PRODUCT_NAME` = **DoorRush**).

## Run the data platform

```bash
cd data-platform
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest
python -m src.pipeline
```

Optional: set `DOORRUSH_DATA_ROOT` or `TAX_ANALYTICS_DATA_ROOT` to override the `data/` directory (legacy: `TAX_LEDGER_DATA_ROOT`).

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

This folder is a **monorepo** (`web/` + `data-platform/`). Vercel must build the Next app from **`web`**, not the repository root.

1. **Project → Settings → General → Root Directory**  
   Point Vercel at the folder that contains **`next.config.mjs`** and **`package.json`** (the Next app), relative to the **Git repository root**:
   - Git root is a repo whose root **is** `tax-ledger-analytics` → use **`web`**.
   - Git root is **`full-stack-applications`** (or any parent that contains this folder) → use **`tax-ledger-analytics/web`** *(common choice)*.
   - Git root is **`GitProjects`** (whole workspace) → use **`full-stack-applications/tax-ledger-analytics/web`** (adjust if your tree differs).

2. **Project → Settings → General → Build & Output**  
   - **Framework Preset:** Next.js (auto-detected once Root Directory is correct).  
   - **Output Directory:** leave **empty** (default). Do **not** set `dist`, `out`, or `.next` manually — wrong values can yield a successful build but **404 NOT_FOUND** at the edge.

3. **Override commands** (only if Vercel did not auto-fill them). Assumes **Root Directory** already points at the Next app folder (e.g. `…/tax-ledger-analytics/web`).

   | Setting | Value |
   |--------|--------|
   | **Install Command** | `npm install` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | *(leave blank / default — do not set)* |
   | **Development Command** | `npm run dev` |

   For reproducible installs, use **`npm ci`** when `package-lock.json` is committed.

   **Important:** If **Root Directory** is already set (e.g. `tax-ledger-analytics/web`), Vercel runs install/build **inside that folder**. Do **not** prefix commands with `cd tax-ledger-analytics/web &&` — that path does not exist from inside the app directory.

4. Redeploy, then open the URL from the latest **Production** deployment.

**Only if Root Directory is empty** (Vercel project root = whole monorepo without `web` as root): use **Install** `cd tax-ledger-analytics/web && npm install` and **Build** `cd tax-ledger-analytics/web && npm run build`. Pick **either** Root Directory **or** `cd …` in commands — never both.

### Vercel Web Analytics

The app includes **`@vercel/analytics`**, `import { Analytics } from "@vercel/analytics/next"`, and `<Analytics />` in `web/src/app/layout.tsx`. After deploy, enable **Web Analytics** under **Project → Analytics** on Vercel.

Optional env **`NEXT_PUBLIC_SITE_URL`** = your canonical URL (e.g. `https://your-project.vercel.app` or custom domain), full string with `https://`. Helps Open Graph / metadata; `VERCEL_URL` is also used when unset.

### Build ok but site shows `404: NOT_FOUND`

1. Open the **exact** URL from the latest deployment (**Visit** on the deployment row).
2. **Output Directory** must be **empty** for Next.js.
3. Check **Deployment Protection** if previews look like 404 for anonymous users.
4. **`web/vercel.json`** sets `"framework": "nextjs"` so the project is not misclassified as static. Redeploy after changes.
