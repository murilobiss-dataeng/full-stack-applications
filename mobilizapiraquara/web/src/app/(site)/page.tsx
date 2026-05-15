import { getFeaturedPost, getPublishedPosts, getCategories } from "@/services/posts";
import { NewsSection } from "@/components/home/news-section";
import { AboutJoinSection } from "@/components/home/about-join-section";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, { posts }, categories] = await Promise.all([
    getFeaturedPost(),
    getPublishedPosts(12),
    getCategories(),
  ]);

  return (
    <div className="site-container space-y-10 py-8 sm:py-10">
      <NewsSection featured={featured} posts={posts} categories={categories} />
      <AboutJoinSection />
    </div>
  );
}
