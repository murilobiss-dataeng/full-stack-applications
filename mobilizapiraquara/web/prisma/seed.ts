import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type PublisherSeed = { email: string; name: string; password: string };

function parsePublishersFromEnv(): PublisherSeed[] {
  const list: PublisherSeed[] = [];

  const defaultPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const defaultEmail = (process.env.ADMIN_EMAIL ?? "admin@mobilizapiraquara.com.br").toLowerCase();

  list.push({
    email: defaultEmail,
    name: "Redação Mobiliza",
    password: defaultPassword,
  });

  // PUBLISHERS_EXTRA=email2@x.com:Nome 2,senha2;email3@x.com:Nome 3,senha3
  const extra = process.env.PUBLISHERS_EXTRA?.trim();
  if (extra) {
    for (const entry of extra.split(";")) {
      const [emailPart, namePart, passPart] = entry.split(":").map((s) => s.trim());
      if (!emailPart) continue;
      list.push({
        email: emailPart.toLowerCase(),
        name: namePart || emailPart.split("@")[0],
        password: passPart || defaultPassword,
      });
    }
  }

  return list;
}

async function main() {
  const publishers = parsePublishersFromEnv();
  const publisherIds: string[] = [];

  for (const p of publishers) {
    const passwordHash = await bcrypt.hash(p.password, 12);
    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {
        name: p.name,
        password: passwordHash,
        canPublish: true,
      },
      create: {
        email: p.email,
        name: p.name,
        password: passwordHash,
        canPublish: true,
      },
    });
    publisherIds.push(user.id);
  }

  const categories = [
    { name: "Política", slug: "politica", color: "#dc2626" },
    { name: "Saúde", slug: "saude", color: "#2563eb" },
    { name: "Segurança", slug: "seguranca", color: "#7c3aed" },
    { name: "Educação", slug: "educacao", color: "#ca8a04" },
    { name: "Mobilidade Urbana", slug: "mobilidade-urbana", color: "#52525b" },
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

  const authorId = publisherIds[0];
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
        authorId,
        seoTitle: p.title.slice(0, 60),
        seoDescription: p.excerpt,
      },
    });
  }

  console.log(
    "Seed concluído:",
    publishers.map((p) => p.email),
    "canPublish=true"
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
