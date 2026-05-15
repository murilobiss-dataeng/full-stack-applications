-- Remove destaque da matéria sem foto adequada; destaca servidor da saúde
UPDATE "Post" SET featured = false, "updatedAt" = now() WHERE slug = 'colapso-causa-animal-piraquara';

UPDATE "Post" SET featured = true, "updatedAt" = now() WHERE slug = 'servidor-saude-preso-piraquara';

-- Opcional: despublicar matéria da causa animal
-- UPDATE "Post" SET published = false WHERE slug = 'colapso-causa-animal-piraquara';
