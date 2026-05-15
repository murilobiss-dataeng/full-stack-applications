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
    <section id="noticias" className="scroll-mt-28 space-y-6">
      <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        Notícias
      </h2>
      {featured && <HeroFeatured post={featured} />}
      <NewsScrollRow posts={recentPosts} title="Mais notícias" />
      <div>
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-zinc-500">
          Categorias
        </p>
        <CategoryPills categories={categories} />
      </div>
    </section>
  );
}
