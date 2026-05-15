-- =============================================================================
-- Adicionar um usuário publicador no Supabase
-- Substitua os valores entre << >> antes de executar.
-- =============================================================================

-- Opção A: senha já em bcrypt (gere com: npm run hash-password -- "sua-senha")
-- no diretório web: node -e "console.log(require('bcryptjs').hashSync('SUA_SENHA',12))"

INSERT INTO "User" (id, email, password, name, "canPublish", "createdAt", "updatedAt")
VALUES (
  'usr_' || substr(md5(random()::text), 1, 20),
  lower('<<email@exemplo.com>>'),
  '<<cole_o_hash_bcrypt_aqui>>',
  '<<Nome do usuário>>',
  true,
  now(),
  now()
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password = EXCLUDED.password,
  "canPublish" = EXCLUDED."canPublish",
  "updatedAt" = now();

-- -----------------------------------------------------------------------------
-- Opção B: gerar hash bcrypt no próprio Postgres (extensão pgcrypto)
-- Descomente e ajuste e-mail, nome e senha em texto:
-- -----------------------------------------------------------------------------
/*
INSERT INTO "User" (id, email, password, name, "canPublish", "createdAt", "updatedAt")
VALUES (
  'usr_' || substr(md5(random()::text), 1, 20),
  lower('novo@mobilizapiraquara.com.br'),
  crypt('sua-senha-segura', gen_salt('bf', 12)),
  'Nome do Redator',
  true,
  now(),
  now()
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password = EXCLUDED.password,
  "canPublish" = EXCLUDED."canPublish",
  "updatedAt" = now();
*/

-- Revogar permissão de publicar:
-- UPDATE "User" SET "canPublish" = false, "updatedAt" = now() WHERE email = 'email@exemplo.com';

-- Listar publicadores:
-- SELECT id, email, name, "canPublish", "createdAt" FROM "User" WHERE "canPublish" = true ORDER BY name;
