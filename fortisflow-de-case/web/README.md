# FortisFlow · Web

Next.js 14 app for **FortisFlow** (Murilo Biss): a **Senior Data Engineer / Snowflake** portfolio case — pipeline zones, tests, DW modeling, governance, `/api/metrics`, and a PM-call prep hub. Cyan-on-slate UI; **FortisFlow** is a fictional regulated enterprise program, not a real company or Sigma client.

## Scripts

- `npm run dev` — local dev
- `npm run build` — production build
- `npm run lint` — ESLint

## Key files

- `src/config/branding.ts` · product name **FortisFlow** and nav descriptor
- `src/config/siteNav.ts` · primary navigation
- `src/app/prep/` · Project Manager interview prep (Sigma / Snowflake alignment)
- `src/app/data-pipeline/` · Snowflake & ELT narrative + `PipelineContent`
- `src/app/data-modeling/` · modeling tabs + diagram
- `src/app/governance/` · quality & governance tabs

## Deploy

Set `NEXT_PUBLIC_SITE_URL` (or rely on `VERCEL_URL`) for Open Graph `metadataBase`.
