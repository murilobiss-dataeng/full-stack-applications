-- Remove matérias publicadas sem URL de capa válida
DELETE FROM "Post"
WHERE "coverImage" IS NULL
   OR TRIM("coverImage") = ''
   OR "coverImage" NOT LIKE 'http%';
