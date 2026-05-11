# DoorRush · Web

Next.js 14 app for **DoorRush** (Murilo Biss): tax and marketplace **Analytics Engineering** portfolio demo, SQL and dbt on a small metrics API, red and white UI, infrastructure and metric-truth context, dashboards, `/api/metrics`, and CV page.

## Scripts

- `npm run dev` · development server
- `npm run build` · production build
- `npm run start` · serve production build
- `npm run lint` · ESLint

## Vercel Web Analytics

Same as the main app: `@vercel/analytics` in `package.json`, and `src/app/layout.tsx` imports `Analytics` from `@vercel/analytics/next` and renders `<Analytics />` in the document body. After deploy, turn on **Web Analytics** in the Vercel project (**Analytics** tab).

- `src/config/branding.ts` · `SITE_PRODUCT_NAME` / scenario: **DoorRush**.

## Static assets

- `public/cv-murilo-biss.pdf` · served at `/cv-murilo-biss.pdf` (download buttons on `/cv` use this URL)
- Source HTML lives at **`../cv/cv-murilo-biss-resume.html`** (repo root `cv/` next to `web/`). After editing, regenerate the PDF and overwrite `public/cv-murilo-biss.pdf`, for example:

```bash
# from repo root (tax-ledger-analytics), paths absolute or adjust:
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/web/public/cv-murilo-biss.pdf" \
  "file://$PWD/cv/cv-murilo-biss-resume.html"
```
