import { getFeaturedPost, getPublishedPosts, getPopularPosts, getCategories } from "@/services/posts";
import { HomeHero } from "@/components/home/home-hero";
import { NewsSection } from "@/components/home/news-section";
import { AboutSection } from "@/components/home/about-section";
import { JoinSection } from "@/components/home/join-section";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, { posts }, popular, categories] = await Promise.all([
    getFeaturedPost(),
    getPublishedPosts(9),
    getPopularPosts(5),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-6 sm:space-y-20 sm:px-6 sm:py-8 lg:px-8">
      <HomeHero />
      <NewsSection featured={featured} posts={posts} popular={popular} categories={categories} />
      <AboutSection />
      <JoinSection />
    </div>
  );
}
