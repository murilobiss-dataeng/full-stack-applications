# sigma-sec · Web

Next.js 14 app for **sigma-sec** (Murilo Biss): a **Senior Data Engineer / Snowflake** portfolio case — pipeline zones, tests, DW modeling, governance, `/api/metrics`, and **AI Lab** (prompt the stack). Cyan-on-slate UI; **sigma-sec** is a fictional regulated enterprise program, not a real company or Sigma client.

Monorepo context: see **[`../README.md`](../README.md)** (local Postgres on **5434**, `data-platform/` stub, `infra/` Terraform outline).

## Scripts

- `npm run dev` — local dev
- `npm run build` — production build
- `npm run lint` — ESLint

## Key files

- `src/config/branding.ts` · product name **sigma-sec** and nav descriptor
- `src/config/siteNav.ts` · primary navigation
- `src/app/infrastructure/` · hub (`InfrastructureHubClient`) with explorer, ELT, **Performance**, **Quality & lineage**, **Governance**, modeling
- `src/app/ai-lab/` · interactive “prompt the stack” walkthrough
- `src/app/data-pipeline/` · `PipelineContent` (also embedded in Infrastructure)
- `src/app/data-modeling/` · modeling tabs + diagram
- `src/app/governance/` · `GovernanceContent` (also reachable as Infrastructure rail **Governance**)
- `src/app/prep/` · legacy route → redirects to `/ai-lab`

## Static assets

- `public/cv-murilo-biss.pdf` · resume PDF (same print-oriented style as tax-ledger-analytics; regenerate from that repo’s `cv/cv-murilo-biss-resume.html` when you update copy)
- `public/sigma_logo.png` · home hero logo

## Deploy

Set `NEXT_PUBLIC_SITE_URL` (or rely on `VERCEL_URL`) for Open Graph `metadataBase`.
