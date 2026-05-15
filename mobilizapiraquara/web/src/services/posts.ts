import { unstable_cache } from "next/cache";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { MOCK_CATEGORIES, MOCK_POSTS, MOCK_POST_CONTENT } from "@/lib/mock-data";
import type { PostCard, PostDetail } from "@/types/post";

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function mapPost(post: {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  featured: boolean;
  views: number;
  content?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  updatedAt?: Date;
  author: { name: string };
  category: { id: string; name: string; slug: string; color: string | null } | null;
}): PostCard {
  return {
    id: post.id,
    title: post.title,
    subtitle: post.subtitle,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    featured: post.featured,
    views: post.views,
    author: { name: post.author.name },
    category: post.category
      ? {
          id: post.category.id,
          name: post.category.name,
          slug: post.category.slug,
          color: post.category.color,
        }
      : null,
  };
}

export async function getPublishedPosts(limit = 12, page = 1) {
  if (!hasDatabase()) {
    const start = (page - 1) * limit;
    return {
      posts: MOCK_POSTS.slice(start, start + limit),
      total: MOCK_POSTS.length,
      hasMore: start + limit < MOCK_POSTS.length,
    };
  }

  const skip = (page - 1) * limit;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
      skip,
      include: { author: true, category: true },
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  return {
    posts: posts.map(mapPost),
    total,
    hasMore: skip + posts.length < total,
  };
}

export const getFeaturedPost = unstable_cache(
  async (): Promise<PostCard | null> => {
    if (!hasDatabase()) {
      return MOCK_POSTS.find((p) => p.featured) ?? MOCK_POSTS[0];
    }
    const post = await prisma.post.findFirst({
      where: { published: true, featured: true },
      orderBy: { publishedAt: "desc" },
      include: { author: true, category: true },
    });
    return post ? mapPost(post) : null;
  },
  ["featured-post"],
  { revalidate: 60 }
);

export async function getPopularPosts(limit = 5) {
  if (!hasDatabase()) {
    return [...MOCK_POSTS].sort((a, b) => b.views - a.views).slice(0, limit);
  }
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: limit,
    include: { author: true, category: true },
  });
  return posts.map(mapPost);
}

export async function getRecentPosts(limit = 6, excludeSlug?: string) {
  const { posts } = await getPublishedPosts(limit + 5);
  return posts.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

export async function getCategories() {
  if (!hasDatabase()) return MOCK_CATEGORIES;
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (!hasDatabase()) {
    const post = MOCK_POSTS.find((p) => p.slug === slug);
    if (!post) return null;
    return {
      ...post,
      content:
        MOCK_POST_CONTENT[slug] ??
        `<p>${post.excerpt ?? ""}</p><p>Conteúdo completo disponível após conexão com o banco de dados.</p>`,
    };
  }

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: { author: true, category: true },
  });
  if (!post) return null;

  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  return {
    ...mapPost(post),
    content: post.content,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    updatedAt: post.updatedAt,
  };
}

export async function getPostsByCategory(slug: string, limit = 12) {
  if (!hasDatabase()) {
    const cat = MOCK_CATEGORIES.find((c) => c.slug === slug);
    if (!cat) return { category: null, posts: [] };
    return {
      category: cat,
      posts: MOCK_POSTS.filter((p) => p.category?.slug === slug).slice(0, limit),
    };
  }

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { category: null, posts: [] };

  const posts = await prisma.post.findMany({
    where: { published: true, categoryId: category.id },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { author: true, category: true },
  });

  return { category, posts: posts.map(mapPost) };
}

export async function searchPosts(query: string, limit = 20) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  if (!hasDatabase()) {
    return MOCK_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
    ).slice(0, limit);
  }

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
      ],
    },
    take: limit,
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true },
  });

  return posts.map(mapPost);
}

export function generateSlug(title: string) {
  return slugify(title, { lower: true, strict: true, locale: "pt" });
}

export async function getAllPostSlugs() {
  if (!hasDatabase()) return MOCK_POSTS.map((p) => ({ slug: p.slug, updatedAt: new Date() }));
  return prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
}
