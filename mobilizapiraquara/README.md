# Mobiliza Piraquara

Portal de notícias locais de Piraquara (PR), inspirado no [Mobiliza Piraquara](https://www.mobilizapiraquara.com.br/). Stack: **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Prisma**, **PostgreSQL**, **Cloudinary**, **OpenAI** e deploy na **Vercel**.

## Funcionalidades

- Homepage com destaque, grid de notícias, categorias e sidebar “Mais lidas”
- Páginas **Quem Somos** e **Junte-se a nós** (formulário com validação)
- Links para [Instagram](https://www.instagram.com/mobilizapiraquara), [Facebook](https://www.facebook.com/profile.php?id=61580773003213) e [WhatsApp](https://wa.me/554174034026)
- Busca, categorias, artigo individual com SEO
- Dark mode, skeleton-ready, cache com `revalidate`
- **Vercel Analytics** integrado
- Dados de exemplo sem banco (mock) ou PostgreSQL em produção

## Começar

```bash
npm install
cp .env.example .env
# Configure DATABASE_URL (opcional para dev com mocks)
npx prisma generate
npx prisma db push   # se usar banco
npm run db:seed      # dados iniciais + admin
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build produção |
| `npm run db:push` | Sincronizar schema Prisma |
| `npm run db:seed` | Seed (admin + notícias exemplo) |
| `npm run db:studio` | Prisma Studio |

## Deploy na Vercel

1. Importe o repositório na Vercel
2. Adicione as variáveis do `.env.example`
3. Conecte um banco **Neon** ou **Supabase** em `DATABASE_URL`
4. Após deploy: `npx prisma db push` e `npm run db:seed` (ou use Vercel CLI)

O **Analytics** é ativado automaticamente com `@vercel/analytics` no layout raiz.

## Estrutura

```
src/
  app/(site)/          # Páginas públicas
  app/admin/           # Painel (em evolução)
  components/          # UI, layout, notícias, formulários
  lib/                 # Utils, auth, constants
  services/            # Posts, IA, Cloudinary
  types/
prisma/
```

## Licença

Projeto privado — Mobiliza Piraquara.
