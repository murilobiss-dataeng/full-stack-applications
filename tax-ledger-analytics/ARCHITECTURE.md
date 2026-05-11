# Tax Analytics — system architecture

## Data plane (`data-platform/`)

1. **Raw zone** — JSON under `data/raw/` (demo dimensions; narrative maps to tax / **DoorRush**-style marketplace counterparties and filings) plus optional JSON Schema in `contracts/`.
2. **Processing** — Python normalizes, flags duplicates, resolves entities; writes `processed/` and `curated/`.
3. **Warehouse DDL** — `src/database/models.py` documents Postgres tables for the demo grain.
4. **dbt** — `src/dbt/`: **seeds**, **views**, **marts**. Project name: `tax_analytics`. Tests in `models/schema.yml` and `tests/`.

## Product plane (`web/`)

- **App Router** — routes under `web/src/app/`.
- **`/cv`** — résumé PDF + role fit.
- **Branding** — `web/src/config/branding.ts`: product name **Tax Analytics**, scenario brand **DoorRush** (fictional).
- **Config** — `web/src/config/siteNav.ts` for navigation.

## Infra (`infra/`)

Terraform stubs, Docker Compose for local Postgres, sample pipeline Dockerfile.
