import { getFeaturedPost, getPublishedPosts, getCategories } from "@/services/posts";
import { HomeHero } from "@/components/home/home-hero";
import { NewsSection } from "@/components/home/news-section";
import { AboutSection } from "@/components/home/about-section";
import { JoinSection } from "@/components/home/join-section";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, { posts }, categories] = await Promise.all([
    getFeaturedPost(),
    getPublishedPosts(8),
    getCategories(),
  ]);

  return (
    <div className="site-container space-y-8 py-4 sm:py-5">
      <HomeHero />
      <NewsSection featured={featured} posts={posts} categories={categories} />
      <AboutSection />
      <JoinSection />
    </div>
  );
}
