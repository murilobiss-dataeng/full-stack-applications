"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { publishLoginSchema, postDraftSchema } from "@/lib/validations";
import { createSession, destroySession, requirePublisher } from "@/lib/auth";
import {
  ENV_PUBLISHER_ID,
  authenticatePublisher,
  authErrorMessage,
  getOrCreateEnvPublisherAuthorId,
} from "@/lib/publish-auth";
import { formatArticleWithAI } from "@/services/ai";
import { createPublishedPost } from "@/services/posts";

/**
 * Login em /publique — tabela public."User" no Supabase (canPublish = true).
 */
export async function publishLogin(data: { username: string; password: string }) {
  const parsed = publishLoginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const result = await authenticatePublisher(parsed.data.username, parsed.data.password);

  if (!result.ok) {
    return { success: false, error: authErrorMessage(result) };
  }

  await createSession({
    id: result.id,
    email: result.email,
    name: result.name,
    canPublish: true,
  });

  return { success: true };
}

export async function publishLogout() {
  await destroySession();
  redirect("/publique");
}

export async function publishArticle(formData: FormData) {
  const publisher = await requirePublisher();
  if (!publisher) {
    return { success: false, error: "Faça login com uma conta habilitada para publicar" };
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

    const authorId =
      publisher.id === ENV_PUBLISHER_ID
        ? await getOrCreateEnvPublisherAuthorId()
        : publisher.id;

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
      authorId,
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
