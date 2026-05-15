import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/services/posts";
import { NewsScrollRow } from "@/components/news/news-scroll-row";
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
    <div className="site-container space-y-6 py-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Categoria</p>
        <h1 className="mt-2 text-2xl font-bold text-white">{category.name}</h1>
      </div>
      {posts.length > 0 ? (
        <NewsScrollRow posts={posts} title={category.name} />
      ) : (
        <p className="text-center text-zinc-500">Nenhuma notícia nesta categoria.</p>
      )}
    </div>
  );
}
