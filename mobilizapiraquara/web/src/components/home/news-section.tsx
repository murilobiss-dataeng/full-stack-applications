"use client";

import { useMemo, useState } from "react";
import { HomeCategoryFilter } from "@/components/news/home-category-filter";
import { NewsPanel } from "@/components/home/news-panel";
import type { PostCard } from "@/types/post";

type Category = { id: string; name: string; slug: string; color?: string | null };

type Props = {
  featured: PostCard | null;
  posts: PostCard[];
  categories: Category[];
};

export function NewsSection({ featured, posts, categories }: Props) {
  const [categorySlug, setCategorySlug] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!categorySlug) return posts;
    return posts.filter((p) => p.category?.slug === categorySlug);
  }, [posts, categorySlug]);

  const filteredFeatured = useMemo(() => {
    if (!categorySlug) return featured;
    if (featured?.category?.slug === categorySlug) return featured;
    return null;
  }, [featured, categorySlug]);

  return (
    <section id="noticias" className="scroll-mt-28">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <HomeCategoryFilter
          categories={categories}
          selectedSlug={categorySlug}
          onSelect={setCategorySlug}
        />
        <div className="p-4 sm:p-5">
          <NewsPanel featured={filteredFeatured} posts={filteredPosts} />
        </div>
      </div>
    </section>
  );
}
