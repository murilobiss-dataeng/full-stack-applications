# DoorRush — system architecture

## Data plane (`data-platform/`)

1. **Raw zone** — JSON under `data/raw/` (demo filenames `lawyers` / `courts` / `cases` map conceptually to **DoorRush** merchants, hubs, and orders for the portfolio narrative).
2. **Processing** — Python normalizes, flags duplicates, resolves merchant identities; writes `processed/` and `curated/`.
3. **Warehouse DDL** — `src/database/models.py` documents Postgres tables for the demo grain.
4. **dbt** — `src/dbt/`: project name **`tax_analytics`**. Tests in `models/schema.yml` and `tests/`.

## Product plane (`web/`)

- **Branding** — `web/src/config/branding.ts`: **DoorRush** (fictional marketplace), red/white theme in `globals.css`.
- **App Router** — routes under `web/src/app/`.
- **`/cv`** — résumé PDF + role fit.

## Infra (`infra/`)

Terraform stubs, Docker Compose for local Postgres, sample pipeline Dockerfile.
