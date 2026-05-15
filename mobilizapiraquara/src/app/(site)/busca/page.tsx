import type { Metadata } from "next";
import { searchPosts } from "@/services/posts";
import { PostsGrid } from "@/components/news/posts-grid";
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">Busca</h1>
      {q ? (
        <>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {posts.length} resultado{posts.length !== 1 ? "s" : ""} para &ldquo;{q}&rdquo;
          </p>
          <div className="mt-8">
            {posts.length > 0 ? (
              <PostsGrid posts={posts} />
            ) : (
              <p className="rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-600">
                Nenhuma notícia encontrada. Tente outros termos.
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 text-slate-600 dark:text-slate-400">Use a busca no menu para encontrar notícias.</p>
      )}
    </div>
  );
}
