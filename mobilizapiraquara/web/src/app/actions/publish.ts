"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema, postDraftSchema } from "@/lib/validations";
import { createSession, destroySession, getSession, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatArticleWithAI } from "@/services/ai";
import { createPublishedPost } from "@/services/posts";

export async function publishLogin(data: { email: string; password: string }) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  if (!process.env.DATABASE_URL) {
    return { success: false, error: "DATABASE_URL não configurada. Publicação requer banco de dados." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.password))) {
    return { success: false, error: "E-mail ou senha incorretos" };
  }

  await createSession({ id: user.id, email: user.email, name: user.name });
  return { success: true };
}

export async function publishLogout() {
  await destroySession();
  redirect("/publique");
}

export async function publishArticle(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Faça login para publicar" };
  }

  const raw = {
    title: (formData.get("title") as string) || undefined,
    rawText: formData.get("rawText") as string,
    categoryId: (formData.get("categoryId") as string) || undefined,
    featured: formData.get("featured") === "on",
  };

  const coverImageUrl = (formData.get("coverImageUrl") as string) || undefined;

  const parsed = postDraftSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  try {
    const formatted = await formatArticleWithAI(parsed.data.rawText, parsed.data.title);

    const post = await createPublishedPost({
      title: formatted.title,
      subtitle: formatted.subtitle,
      content: formatted.contentHtml,
      excerpt: formatted.excerpt,
      coverImage: coverImageUrl || null,
      categoryId: parsed.data.categoryId ?? null,
      featured: parsed.data.featured ?? false,
      seoTitle: formatted.seoTitle,
      seoDescription: formatted.seoDescription,
      authorId: session.id,
    });

    revalidatePath("/");
    revalidatePath(`/noticia/${post.slug}`);
    revalidatePath("/sitemap.xml");

    return { success: true, slug: post.slug };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro ao publicar";
    return { success: false, error: message };
  }
}
