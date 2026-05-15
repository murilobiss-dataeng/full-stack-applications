"use server";

import { searchPosts } from "@/services/posts";

export async function searchPostsAction(query: string) {
  const posts = await searchPosts(query, 8);
  return posts.map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt }));
}
