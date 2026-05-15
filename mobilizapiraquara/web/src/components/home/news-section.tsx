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
  const recentPosts = posts.filter((p) => p.slug !== featured?.slug).slice(0, 5);

  return (
    <section id="noticias" className="scroll-mt-20 space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-500">Notícias</h2>
      {featured && <HeroFeatured post={featured} />}
      <NewsScrollRow posts={recentPosts} title="Últimas" />
      <CategoryPills categories={categories} />
    </section>
  );
}
