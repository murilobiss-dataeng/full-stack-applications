import Link from "next/link";
import { getFeaturedPost, getPublishedPosts, getPopularPosts, getCategories } from "@/services/posts";
import { HeroFeatured } from "@/components/news/hero-featured";
import { PostsGrid } from "@/components/news/posts-grid";
import { SidebarPopular } from "@/components/news/sidebar-popular";
import { CategoryPills } from "@/components/news/category-pills";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, { posts }, popular, categories] = await Promise.all([
    getFeaturedPost(),
    getPublishedPosts(9),
    getPopularPosts(5),
    getCategories(),
  ]);

  const recentPosts = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {featured && (
        <section className="mb-10">
          <HeroFeatured post={featured} />
        </section>
      )}

      <section className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-brand-800 to-brand-600 px-6 py-8 text-center text-white shadow-lg sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-100">Mobilização cívica</p>
        <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">{SITE.tagline}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-brand-50">
          Informação, transparência e união por uma Piraquara mais desenvolvida.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href="/quem-somos#pilares">Quem Somos</Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-brand-50">
            <Link href="/junte-se">Junte-se a nós</Link>
          </Button>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-serif text-xl font-bold text-slate-900 dark:text-white">Categorias</h2>
        <CategoryPills categories={categories} />
      </section>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-6 flex items-end justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Últimas notícias</h2>
            <Link href="/busca" className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
              Ver todas →
            </Link>
          </div>
          <PostsGrid posts={recentPosts} />
        </section>
        <SidebarPopular posts={popular} />
      </div>
    </div>
  );
}
