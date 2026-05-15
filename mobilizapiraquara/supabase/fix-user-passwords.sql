-- Padroniza senhas em bcrypt (recomendado)
-- Senha para todos abaixo: altere-esta-senha
-- Hash gerado com bcrypt 12 rounds (igual ao app Node)

UPDATE "User"
SET
  password = '$2b$12$NgHrE8ysbov6hN1B2EeU/.43lQRIlfOhFn1XvXNHq70QI/bzeuEba',
  "updatedAt" = now()
WHERE email IN (
  'admin@mobilizapiraquara.com.br',
  'redator2@mobilizapiraquara.com.br',
  'manco@mobilizapiraquara.com.br'
);

-- manco: senha em texto "manco" também funciona no app até rodar o UPDATE acima
