import Link from "next/link";
import { HeroFeatured } from "@/components/news/hero-featured";
import { NewsScrollRow } from "@/components/news/news-scroll-row";
import { CategoryPills } from "@/components/news/category-pills";
import type { PostCard } from "@/types/post";

type Category = { id: string; name: string; slug: string; color?: string | null };

type Props = {
  featured: PostCard | null;
  posts: PostCard[];
  categories: Category[];
};

export function NewsSection({ featured, posts, categories }: Props) {
  const recentPosts = posts.filter((p) => p.slug !== featured?.slug).slice(0, 6);

  return (
    <section id="noticias" className="scroll-mt-24 space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">Notícias</h2>
        <Link href="/busca" className="text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300">
          Buscar
        </Link>
      </div>

      {featured && <HeroFeatured post={featured} />}

      <NewsScrollRow posts={recentPosts} title="Últimas" />

      <div className="pt-1">
        <p className="mb-2 text-xs font-medium text-zinc-500">Categorias</p>
        <CategoryPills categories={categories} />
      </div>
    </section>
  );
}
