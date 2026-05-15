import Link from "next/link";
import { HeroFeatured } from "@/components/news/hero-featured";
import { PostsGrid } from "@/components/news/posts-grid";
import { SidebarPopular } from "@/components/news/sidebar-popular";
import { CategoryPills } from "@/components/news/category-pills";
import type { PostCard } from "@/types/post";

type Category = { id: string; name: string; slug: string; color?: string | null };

type Props = {
  featured: PostCard | null;
  posts: PostCard[];
  popular: PostCard[];
  categories: Category[];
};

export function NewsSection({ featured, posts, popular, categories }: Props) {
  const recentPosts = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <section id="noticias" className="scroll-mt-28 space-y-8">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 dark:border-slate-700 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Informação local
          </p>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Notícias
          </h2>
        </div>
        <Link
          href="/busca"
          className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
        >
          Buscar notícias →
        </Link>
      </div>

      {featured && <HeroFeatured post={featured} />}

      <div>
        <h3 className="mb-3 font-serif text-lg font-bold text-slate-900 dark:text-white">Categorias</h3>
        <CategoryPills categories={categories} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,300px)] lg:gap-10">
        <div>
          <h3 className="mb-5 font-serif text-xl font-bold text-slate-900 dark:text-white">Últimas notícias</h3>
          <PostsGrid posts={recentPosts} />
        </div>
        <SidebarPopular posts={popular} />
      </div>
    </section>
  );
}
