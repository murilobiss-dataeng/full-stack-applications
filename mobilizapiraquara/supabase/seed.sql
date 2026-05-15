-- =============================================================================
-- Mobiliza Piraquara — dados iniciais (Supabase)
-- Execute DEPOIS de schema.sql
-- Senha padrão dos usuários abaixo: altere-esta-senha
-- (troque em produção; login em /publique usa USERNAME/PASSWORD na Vercel)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Usuários / publicadores (canPublish = true)
-- password = bcrypt hash de "altere-esta-senha" (12 rounds, compatível com o app)
-- -----------------------------------------------------------------------------
INSERT INTO "User" (id, email, password, name, "canPublish", "createdAt", "updatedAt")
VALUES
  (
    'usr_redacao_principal',
    'admin@mobilizapiraquara.com.br',
    '$2b$12$NgHrE8ysbov6hN1B2EeU/.43lQRIlfOhFn1XvXNHq70QI/bzeuEba',
    'Redação Mobiliza',
    true,
    now(),
    now()
  ),
  (
    'usr_redator_2',
    'redator2@mobilizapiraquara.com.br',
    '$2b$12$NgHrE8ysbov6hN1B2EeU/.43lQRIlfOhFn1XvXNHq70QI/bzeuEba',
    'Redator 2',
    true,
    now(),
    now()
  )
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password = EXCLUDED.password,
  "canPublish" = EXCLUDED."canPublish",
  "updatedAt" = now();

-- Usuário sem permissão de publicar (exemplo)
INSERT INTO "User" (id, email, password, name, "canPublish", "createdAt", "updatedAt")
VALUES (
  'usr_leitor_apenas',
  'leitor@mobilizapiraquara.com.br',
  '$2b$12$NgHrE8ysbov6hN1B2EeU/.43lQRIlfOhFn1XvXNHq70QI/bzeuEba',
  'Conta leitor',
  false,
  now(),
  now()
)
ON CONFLICT (email) DO NOTHING;

-- -----------------------------------------------------------------------------
-- Categorias
-- -----------------------------------------------------------------------------
INSERT INTO "Category" (id, name, slug, color, "createdAt")
VALUES
  ('cat_politica', 'Política', 'politica', '#dc2626', now()),
  ('cat_saude', 'Saúde', 'saude', '#2563eb', now()),
  ('cat_seguranca', 'Segurança', 'seguranca', '#7c3aed', now()),
  ('cat_educacao', 'Educação', 'educacao', '#ca8a04', now()),
  ('cat_mobilidade', 'Mobilidade Urbana', 'mobilidade-urbana', '#52525b', now()),
  ('cat_animal', 'Causa Animal', 'causa-animal', '#ea580c', now())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  color = EXCLUDED.color;

-- -----------------------------------------------------------------------------
-- Matérias de exemplo (opcional)
-- -----------------------------------------------------------------------------
INSERT INTO "Post" (
  id, title, subtitle, slug, excerpt, content,
  "coverImage", published, featured, views, "publishedAt",
  "authorId", "categoryId", "seoTitle", "seoDescription",
  "createdAt", "updatedAt"
)
VALUES (
  'post_causa_animal_1',
  'A agonia nas ruas e a omissão nos gabinetes: o colapso da causa animal em Piraquara',
  'Sem abrigo, sem recolhimento e sob um surto silencioso de esporotricose',
  'colapso-causa-animal-piraquara',
  'A cidade terceiriza sua responsabilidade enquanto animais agonizam nas calçadas.',
  '<p>Piraquara vive um momento crítico na proteção animal. O Mobiliza Piraquara cobra um plano de ação com prazos e transparência.</p>',
  'https://images.unsplash.com/photo-1450778869188-41d0601e46e5?w=1200&q=80',
  true,
  true,
  2840,
  now(),
  'usr_redacao_principal',
  'cat_animal',
  'Colapso da causa animal em Piraquara',
  'A cidade terceiriza sua responsabilidade enquanto animais agonizam nas calçadas.',
  now(),
  now()
),
(
  'post_camara_tce',
  'Câmara de Piraquara recebe nota zero em fiscalização no TCE-PR',
  NULL,
  'camara-piraquara-nota-zero-tce',
  'Avaliação de 2025 expõe fragilidades no controle do Legislativo.',
  '<p>O Tribunal de Contas classificou a Câmara com a pior nota do Paraná em fiscalização.</p>',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80',
  true,
  false,
  3420,
  now(),
  'usr_redacao_principal',
  'cat_politica',
  'Câmara de Piraquara — nota zero TCE',
  'Avaliação de 2025 expõe fragilidades no controle do Legislativo.',
  now(),
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  published = EXCLUDED.published,
  "updatedAt" = now();
