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

## Observações

- Distâncias são **em linha reta** (fórmula de Haversine), não tempo de carro.
- Coordenadas obtidas via geocodificação OpenStreetMap; confira endereços antes de visitar.
- Preços e telefones devem ser confirmados com cada estabelecimento.
