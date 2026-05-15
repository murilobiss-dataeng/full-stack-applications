# Mobiliza Piraquara

Portal de notícias locais de Piraquara (PR).

## Estrutura

```
mobilizapiraquara/
├── web/              ← app Next.js (deploy na Vercel)
│   ├── src/
│   ├── prisma/
│   ├── public/
│   └── vercel.json
├── .env.example
└── README.md
```

## Deploy na Vercel (monorepo)

O repositório é `murilobiss-dataeng/full-stack-applications`. O app **não** fica na raiz do repo.

| Configuração | Valor |
|--------------|--------|
| **Root Directory** | `mobilizapiraquara/web` **(recomendado)** ou `mobilizapiraquara` |
| **Framework Preset** | Next.js (detectado via `vercel.json`) |

**Não use a raiz do repositório** (`full-stack-applications`) — o build falha com *No Next.js version detected*.

Detalhes: [VERCEL.md](./VERCEL.md)

### Variáveis de ambiente

Copie `.env.example` para `web/.env` em desenvolvimento. Na Vercel, configure no projeto:

- `NEXT_PUBLIC_SITE_URL` — URL canônica com `https://` (ex.: domínio customizado)
- `DATABASE_URL` — PostgreSQL (Neon/Supabase), opcional (mock sem banco)
- Demais chaves conforme `.env.example`

### Web Analytics (Vercel)

1. O pacote `@vercel/analytics` está em `web/package.json`
2. `web/src/app/layout.tsx` importa `Analytics` de `@vercel/analytics/next`
3. Após o deploy, ative **Analytics → Web Analytics** no painel do projeto Vercel

## Desenvolvimento local

```bash
cd mobilizapiraquara/web
cp ../.env.example .env
npm install
npx prisma generate
npm run dev
```
