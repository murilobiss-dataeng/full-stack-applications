import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@mobilizapiraquara.com.br" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@mobilizapiraquara.com.br",
      password,
      name: "Redação Mobiliza",
    },
  });

  const categories = [
    { name: "Política", slug: "politica", color: "#dc2626" },
    { name: "Saúde", slug: "saude", color: "#2563eb" },
    { name: "Segurança", slug: "seguranca", color: "#7c3aed" },
    { name: "Educação", slug: "educacao", color: "#ca8a04" },
    { name: "Mobilidade Urbana", slug: "mobilidade-urbana", color: "#0d9488" },
    { name: "Causa Animal", slug: "causa-animal", color: "#ea580c" },
  ];

  const catMap: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { color: c.color },
      create: c,
    });
    catMap[c.slug] = cat.id;
  }

  const posts = [
    {
      title: "A agonia nas ruas e a omissão nos gabinetes: o colapso da causa animal em Piraquara",
      subtitle: "Sem abrigo, sem recolhimento e sob um surto silencioso de esporotricose",
      slug: "colapso-causa-animal-piraquara",
      excerpt:
        "A cidade terceiriza sua responsabilidade enquanto animais agonizam nas calçadas.",
      content:
        "<p>Piraquara vive um momento crítico na proteção animal. A ausência de abrigo municipal coloca em risco a saúde pública.</p><p>O Mobiliza Piraquara cobra um plano de ação com prazos e transparência.</p>",
      coverImage: "https://images.unsplash.com/photo-1450778869188-41d0601e46e5?w=1200&q=80",
      featured: true,
      categoryId: catMap["causa-animal"],
      views: 2840,
    },
    {
      title: "Câmara de Piraquara recebe nota zero em fiscalização no TCE-PR",
      slug: "camara-piraquara-nota-zero-tce",
      excerpt: "Avaliação de 2025 expõe fragilidades no controle do Legislativo.",
      content: "<p>O Tribunal de Contas classificou a Câmara com a pior nota do Paraná em fiscalização.</p>",
      coverImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
      featured: false,
      categoryId: catMap["politica"],
      views: 3420,
    },
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: { ...p, published: true, publishedAt: new Date() },
      create: {
        ...p,
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
        seoTitle: p.title.slice(0, 60),
        seoDescription: p.excerpt,
      },
    });
  }

  console.log("Seed concluído:", { admin: admin.email, posts: posts.length });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
