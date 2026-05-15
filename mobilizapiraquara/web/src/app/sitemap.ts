import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllPostSlugs, getCategories } from "@/services/posts";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "hourly", priority: 1 },
    { url: `${base}/quem-somos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/junte-se`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/busca`, changeFrequency: "weekly", priority: 0.5 },
  ];

  try {
    const [slugs, categories] = await Promise.all([getAllPostSlugs(), getCategories()]);

    const posts: MetadataRoute.Sitemap = slugs.map((p) => ({
      url: `${base}/noticia/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    const cats: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${base}/categoria/${c.slug}`,
      changeFrequency: "daily",
      priority: 0.7,
    }));

    return [...staticPages, ...posts, ...cats];
  } catch {
    return staticPages;
  }
}
