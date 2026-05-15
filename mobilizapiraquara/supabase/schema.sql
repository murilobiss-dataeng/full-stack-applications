-- =============================================================================
-- Mobiliza Piraquara — schema PostgreSQL (Supabase)
-- Execute no SQL Editor: https://supabase.com/dashboard → SQL → New query
-- Ordem: rode este arquivo antes de seed.sql
-- =============================================================================

-- Extensões úteis (senhas com bcrypt no seed, se preferir crypt())
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- User
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "User" (
  id           TEXT PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  password     TEXT NOT NULL,
  name         TEXT NOT NULL,
  "canPublish" BOOLEAN NOT NULL DEFAULT false,
  "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "User_canPublish_idx" ON "User" ("canPublish");

-- -----------------------------------------------------------------------------
-- Category
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Category" (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  color       TEXT DEFAULT '#52525b',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- Post
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Post" (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  subtitle         TEXT,
  slug             TEXT NOT NULL UNIQUE,
  excerpt          TEXT,
  content          TEXT NOT NULL,
  "coverImage"     TEXT,
  published        BOOLEAN NOT NULL DEFAULT false,
  featured         BOOLEAN NOT NULL DEFAULT false,
  views            INTEGER NOT NULL DEFAULT 0,
  "publishedAt"    TIMESTAMPTZ,
  "createdAt"      TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"      TIMESTAMPTZ NOT NULL DEFAULT now(),
  "authorId"       TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "categoryId"     TEXT REFERENCES "Category"(id) ON DELETE SET NULL,
  "seoTitle"       TEXT,
  "seoDescription" TEXT
);

CREATE INDEX IF NOT EXISTS "Post_published_publishedAt_idx" ON "Post" (published, "publishedAt");
CREATE INDEX IF NOT EXISTS "Post_featured_idx" ON "Post" (featured);
CREATE INDEX IF NOT EXISTS "Post_slug_idx" ON "Post" (slug);

-- -----------------------------------------------------------------------------
-- Media
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Media" (
  id          TEXT PRIMARY KEY,
  url         TEXT NOT NULL,
  "publicId"  TEXT,
  alt         TEXT,
  width       INTEGER,
  height      INTEGER,
  "postId"    TEXT REFERENCES "Post"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- Lead (formulário Junte-se)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Lead" (
  id          TEXT PRIMARY KEY,
  "fullName"  TEXT NOT NULL,
  whatsapp    TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- updatedAt automático (compatível com Prisma @updatedAt)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS user_updated_at ON "User";
CREATE TRIGGER user_updated_at
  BEFORE UPDATE ON "User"
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS post_updated_at ON "Post";
CREATE TRIGGER post_updated_at
  BEFORE UPDATE ON "Post"
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------------
-- RLS (opcional)
-- O app usa Prisma com DATABASE_URL (role postgres / service) — bypassa RLS.
-- Se for expor tabelas via Supabase API no futuro, habilite políticas aqui.
-- -----------------------------------------------------------------------------
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Media" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;

-- Política: service role / conexão direta do Prisma continua com acesso total.
-- Leitura pública só em posts publicados (via API Supabase, se usar).
CREATE POLICY "post_public_read" ON "Post"
  FOR SELECT
  USING (published = true);

CREATE POLICY "category_public_read" ON "Category"
  FOR SELECT
  USING (true);
