import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/services/posts";
import { PostsGrid } from "@/components/news/posts-grid";
import { SITE } from "@/lib/constants";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await getPostsByCategory(params.slug, 1);
  if (!category) return { title: "Categoria" };
  return {
    title: category.name,
    description: `Notícias de ${category.name} em ${SITE.name}`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { category, posts } = await getPostsByCategory(params.slug);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Categoria</p>
      <h1 className="mt-2 font-serif text-4xl font-bold text-slate-900 dark:text-white">{category.name}</h1>
      <div className="mt-10">
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
