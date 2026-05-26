# Guia de Casas de Repouso — Curitiba e Região

Landing page para consolidar informações sobre casas de repouso para idosos, com mapa interativo, distâncias até pontos de referência familiares e contato direto via WhatsApp.

## Pontos de referência

- **Casa da Gislaine** — Rua Coronel Romão Rodrigues Branco, 389
- **Casa da Crislaine** — Av. Prefeito Maurício Fruet, 1270
- **Casa do Túlio** — Rua Ângelo Milani Scremin, 128

## Desenvolvimento

```bash
cd casas-repouso-guide
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Os arquivos estáticos ficam em `dist/` — podem ser publicados na Vercel, Netlify ou GitHub Pages.

## Deploy na Vercel

Este projeto é **Vite + React** (não é Next.js). Na Vercel:

- **Root Directory:** `casas-repouso-guide` (se o repositório for o monorepo `full-stack-applications`)
- **Framework Preset:** Vite (ou deixe o `vercel.json` detectar)
- Build e saída já estão em `vercel.json` (`dist/`)

### Web Analytics (Vercel)

1. O pacote `@vercel/analytics` está em `package.json`
2. `src/main.tsx` importa `Analytics` de `@vercel/analytics/react` (em Next.js seria `@vercel/analytics/next`)
3. Após o deploy, no painel do projeto: **Analytics → Web Analytics → Enable**

Em desenvolvimento local o script não envia dados; as métricas aparecem após publicar na Vercel com Web Analytics ativado.

## Observações

- Distâncias são **em linha reta** (fórmula de Haversine), não tempo de carro.
- Coordenadas obtidas via geocodificação OpenStreetMap; confira endereços antes de visitar.
- Preços e telefones devem ser confirmados com cada estabelecimento.
