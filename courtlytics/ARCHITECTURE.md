# Courtlytics — system architecture

## Data plane (`data-platform/`)

1. **Raw zone** — JSON under `data/raw/` (`lawyers`, `courts`, `cases`, `case_lawyer`) plus optional JSON Schema in `contracts/`.
2. **Processing** — Python normalizes, flags duplicates, resolves entities; writes `processed/` and `curated/`.
3. **Warehouse DDL** — `src/database/models.py` documents Postgres tables: lawyers, courts, cases, case_lawyer, resolved_entities, ingestion_batch.
4. **dbt** — `src/dbt/`: **seeds** represent a warehouse-aligned slice; **views** (`lawyers`, `courts`, `cases`, `case_lawyer`) expose the core grain; **marts** (`lawyer_metrics`, `case_aggregations`) build KPIs. Tests live in `models/schema.yml` and `tests/`.

## Product plane (`web/`)

- **App Router** — each route owns `page.tsx`; heavy interactive UI lives in `*Content.tsx` or `*Client.tsx` next to the page.
- **Shared UI** — `components/` (layout, charts, tabs). **TabPanel** centralizes sectioned long-form docs.
- **Config** — `src/config/siteNav.ts` is the only hand-edited navigation list (Navbar + Footer + home doc strip import from here).
- **Types** — `src/types/metrics.ts` mirrors the mock API contract for charts and AI Lab.

## Infra (`infra/`)

Terraform stubs, Docker Compose for local Postgres, sample pipeline Dockerfile — see Governance → *Infra as code* in the app.
