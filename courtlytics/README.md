# Courtlytics

**Legal Entity Resolution & Analytics Platform** — portfolio monorepo demonstrating senior-level data engineering (Python, PostgreSQL, S3-style zones, dbt under `src/dbt`) and a Next.js 14 product surface.

Earlier working titles included CourtSight AI; the product is now **Courtlytics** — court data, analytics, and resolved legal entities in one stack.

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for how the data plane, dbt layer, web app, and infra folder fit together.

## Repository layout

| Path | Description |
|------|-------------|
| `web/` | Next.js 14 (App Router), TypeScript, Tailwind, Recharts, `/api/metrics`, Governance & AI Lab pages |
| `data-platform/` | Python ETL, ingestion, entity resolution, pytest, mock JSON under `data/raw` |
| `infra/` | Terraform stubs, `docker-compose.yml` (local Postgres), sample `Dockerfile.pipeline` for batch jobs |

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

Open [http://localhost:3000](http://localhost:3000). Metrics for charts: [http://localhost:3000/api/metrics](http://localhost:3000/api/metrics). **AI Lab** (simulated analyst UI): [http://localhost:3000/ai-lab](http://localhost:3000/ai-lab).

## Local Postgres (optional)

From `infra/`:

```bash
cd infra && docker compose up -d
# Postgres on localhost:5433 — use for integration tests or dbt against a throwaway DB.
```

## Run production build

```bash
cd web && npm run build && npm start
```

## Deploy on Vercel (`courtlytics-web`)

This repo is a **monorepo** (`web/` + `data-platform/`). Vercel must build the Next app from **`web`**, not the repository root.

1. **Project → Settings → General → Root Directory**  
   Point Vercel at the folder that contains **`next.config.mjs`** and **`package.json`** (the Next app), relative to the **Git repository root**:
   - Git root is the **`courtlytics`** repo folder → use **`web`**.
   - Git root is **`full-stack-applications`** (or any parent that has `courtlytics` inside it) → use **`courtlytics/web`** *(this is a common correct choice)*.
   - Git root is **`GitProjects`** (entire workspace repo) → use **`full-stack-applications/courtlytics/web`** (adjust if your tree differs).

2. **Project → Settings → General → Build & Output**  
   - **Framework Preset:** Next.js (auto-detected once Root Directory is `web`).  
   - **Output Directory:** leave **empty** (default). Do **not** set `dist`, `out`, or `.next` manually — wrong values cause a successful build but a **404 NOT_FOUND** at the edge.

3. **Override commands** (only if Vercel did not auto-fill them). Assumes **Root Directory** already points at the Next app folder (`…/courtlytics/web`).

   | Setting | Value |
   |--------|--------|
   | **Install Command** | `npm install` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | *(leave blank / default — do not set)* |
   | **Development Command** | `npm run dev` |

   For reproducible CI-style installs (lockfile committed), use **`npm ci`** instead of `npm install`.

   **Important:** If **Root Directory** is already set (e.g. `courtlytics/web`), Vercel runs install/build **inside that folder**. Do **not** prefix commands with `cd courtlytics/web &&` or `cd web &&` — that path does not exist from inside the app directory and you get `No such file or directory`.

4. Redeploy, then open the URL shown on the latest **Production** deployment (not an old preview hash unless you mean to).

If it still fails: open that deployment → **Building** logs and confirm `next build` ran.

**Only if Root Directory is empty** (project root = whole repo `full-stack-applications`): then use **Install** `cd courtlytics/web && npm install` and **Build** `cd courtlytics/web && npm run build`. Pick **either** Root Directory **or** `cd …` in commands — never both.

### Build ok but site shows `404: NOT_FOUND`

1. **Open the exact URL** from the latest deployment (Deployments → your deployment → **Visit**). Preview hashes and production URLs differ; a typo or an old link shows Vercel’s `NOT_FOUND`.
2. **Settings → Build & Output → Output Directory** must be **empty** for Next.js (not `out`, `dist`, or `.next`).
3. **Settings → Deployment Protection**: if previews require login, anonymous visits can look like a generic 404 — sign in or adjust protection.
4. **`web/vercel.json`** sets `"framework": "nextjs"` so the project is not misclassified as a static site. Redeploy after pulling.
5. Optional env **`NEXT_PUBLIC_SITE_URL`** = your canonical URL (e.g. `https://courtlytics-web.vercel.app` or your custom domain). Use full URL with `https://` (or rely on `VERCEL_URL` automatically).
6. **Monorepo `.gitignore` (fixed in repo):** the parent `full-stack-applications/.gitignore` used to ignore any `lib/`, any `public`, and all `*.json`. That could keep **`courtlytics/web/src/lib/`**, **`web/public/`**, and **`package.json` / `tsconfig.json`** out of Git so Vercel never received a complete Next app. After pulling the ignore fix, **commit the real files** if they were missing:

   ```bash
   cd full-stack-applications   # repo root
   git status courtlytics/web
   git add courtlytics/web/
   git commit -m "Track Courtlytics web app files for Vercel deploy"
   git push
   ```
