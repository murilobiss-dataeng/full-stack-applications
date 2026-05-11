# Sigma Sec — system architecture

## Product plane (`web/`)

- **Branding** — `web/src/config/branding.ts`: program key `sigma-sec`, display name **Sigma Sec** on the home/nav where relevant.
- **App Router** — routes under `web/src/app/` (Infrastructure hub, Analytics surface, AI Lab, CV, etc.).
- **`/api/metrics`** — mock JSON merged with typed defaults in `web/src/lib/mockPipelineMetrics.ts`; charts and AI Lab consume the same shape.
- **Static mock** — `web/public/mock/pipeline-metrics.json` for demos without running Node.

## Data plane (`data-platform/`) — stub, extensible

This case is **web-first**: there is no heavy Python ETL in-repo yet. The stub package:

1. Resolves the repo-root path to `web/public/mock/pipeline-metrics.json`.
2. Asserts required keys exist (`pipeline`, `batchId`, etc.) so CI proves **contract alignment** between “data team” artifacts and the UI.

**To grow toward Courtlytics / DoorRush parity:** add `data/raw/`, normalization modules, `src/dbt/` with a `dbt_project.yml`, and wire loaders to **`infra/`** Postgres (`localhost:5434`) before promoting to Snowflake in real life.

## Infra (`infra/`)

| Piece | Role |
|-------|------|
| `docker-compose.yml` | Local **Postgres 16** on host port **5434** (avoids clashing with DoorRush’s `5433`). |
| `terraform/` | Commented AWS outline (KMS, raw bucket, pipeline vs analyst roles) — copy into your org modules. |
| `docker/Dockerfile.pipeline` | Builds a slim image that runs `python -m src.pipeline` from `data-platform/` (CI-friendly smoke). |

## Flow (today)

```text
[ mock JSON + TS constants ] → /api/metrics → Next.js pages (charts, AI Lab)
                    ↑
         data-platform stub validates same file in CI
```

## Flow (tomorrow)

```text
[ raw files / APIs ] → Python ETL → Postgres (infra) → dbt marts → export or federate metrics
                                                      → optional sync into mock or live API
```
