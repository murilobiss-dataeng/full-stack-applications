import { getFeaturedPost, getPublishedPosts, getCategories } from "@/services/posts";
import { NewsSection } from "@/components/home/news-section";
import { AboutSection } from "@/components/home/about-section";
import { JoinSection } from "@/components/home/join-section";
import { SITE } from "@/lib/constants";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, { posts }, categories] = await Promise.all([
    getFeaturedPost(),
    getPublishedPosts(8),
    getCategories(),
  ]);

  return (
    <div className="site-container space-y-10 py-8 sm:py-10">
      <p className="text-center text-base text-zinc-400">{SITE.tagline}</p>
      <NewsSection featured={featured} posts={posts} categories={categories} />
      <AboutSection />
      <JoinSection />
    </div>
  );
}
