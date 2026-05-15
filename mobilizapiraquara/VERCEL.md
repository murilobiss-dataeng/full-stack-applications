# Deploy Vercel — Mobiliza Piraquara

## Root Directory (obrigatório)

No painel **Project → Settings → General → Root Directory**, use **uma** destas opções:

| Opção | Valor | Recomendado |
|-------|--------|-------------|
| **A** | `mobilizapiraquara/web` | Sim |
| **B** | `mobilizapiraquara` | Funciona com `vercel.json` na raiz do projeto |

**Não deixe vazio.** Se estiver na raiz do monorepo (`full-stack-applications`), o build falha com:

> No Next.js version detected

porque o `package.json` da raiz do repo não inclui o Next.js deste app.

## Após alterar o Root Directory

1. Salve as configurações
2. **Deployments → Redeploy** (sem cache, se quiser)
3. Confira nos logs: `Installing dependencies...` deve levar mais que ~1s e listar centenas de pacotes

## Web Analytics

1. Código: `@vercel/analytics` em `web/src/app/layout.tsx`
2. Painel: **Analytics → Web Analytics → Enable**

## Variável opcional

`NEXT_PUBLIC_SITE_URL` = `https://seu-dominio.vercel.app` (com `https://`)
