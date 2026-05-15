import type { Metadata } from "next";
import { searchPosts } from "@/services/posts";
import { NewsScrollRow } from "@/components/news/news-scroll-row";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Busca",
  description: `Busque notícias em ${SITE.name}`,
};

type Props = { searchParams: { q?: string } };

export default async function BuscaPage({ searchParams }: Props) {
  const q = searchParams.q?.trim() ?? "";
  const posts = q ? await searchPosts(q) : [];

  return (
    <div className="site-container py-8">
      <h1 className="text-center text-xl font-bold text-white">Busca</h1>
      {q ? (
        <>
          <p className="mt-2 text-center text-sm text-zinc-400">
            {posts.length} resultado{posts.length !== 1 ? "s" : ""} para &ldquo;{q}&rdquo;
          </p>
          <div className="mt-8">
            {posts.length > 0 ? (
              <NewsScrollRow posts={posts} title="Resultados" />
            ) : (
              <p className="rounded-xl border border-dashed border-zinc-700 p-12 text-center text-zinc-500">
                Nenhuma notícia encontrada.
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 text-center text-zinc-400">Informe um termo na URL: /busca?q=...</p>
      )}
    </div>
  );
}
