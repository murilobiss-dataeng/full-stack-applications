import { CategoryPills } from "@/components/news/category-pills";
import { NewsPanel } from "@/components/home/news-panel";
import type { PostCard } from "@/types/post";

type Category = { id: string; name: string; slug: string; color?: string | null };

type Props = {
  featured: PostCard | null;
  posts: PostCard[];
  categories: Category[];
};

export function NewsSection({ featured, posts, categories }: Props) {
  return (
    <section id="noticias" className="scroll-mt-28 space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Notícias</h2>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">Categorias</p>
        <CategoryPills categories={categories} />
      </div>

      <NewsPanel featured={featured} posts={posts} />
    </section>
  );
}
