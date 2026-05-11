# DoorRush — Web

Next.js 14 app for **DoorRush** (Murilo Biss): tax & marketplace **Data Analyst** portfolio demo — SQL/BI on a small metrics API, red/white UI, infrastructure + metric-truth context, dashboards, `/api/metrics`, and CV page.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Vercel Web Analytics

Same as the main app: `@vercel/analytics` in `package.json`, and `src/app/layout.tsx` imports `Analytics` from `@vercel/analytics/next` and renders `<Analytics />` in the document body. After deploy, turn on **Web Analytics** in the Vercel project (**Analytics** tab).

- `src/config/branding.ts` — `SITE_PRODUCT_NAME` / scenario: **DoorRush**.

## Static assets

- `public/cv-murilo-biss.pdf` — served at `/cv-murilo-biss.pdf`
