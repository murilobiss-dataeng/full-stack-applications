import { getFeaturedPost, getPublishedPosts, getCategories } from "@/services/posts";
import { HomeHero } from "@/components/home/home-hero";
import { NewsSection } from "@/components/home/news-section";
import { AboutSection } from "@/components/home/about-section";
import { JoinSection } from "@/components/home/join-section";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, { posts }, categories] = await Promise.all([
    getFeaturedPost(),
    getPublishedPosts(7),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-5 sm:px-6 sm:py-6">
      <HomeHero />
      <NewsSection featured={featured} posts={posts} categories={categories} />
      <AboutSection />
      <JoinSection />
    </div>
  );
}
