import { unstable_cache } from "next/cache";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { dbQuery, isDatabaseConfigured } from "@/lib/db";
import { MOCK_CATEGORIES, MOCK_POSTS, MOCK_POST_CONTENT } from "@/lib/mock-data";
import { hasValidCover, resolveCoverImage } from "@/lib/cover-image";
import type { PostCard, PostDetail } from "@/types/post";

const postWithCoverWhere = {
  published: true,
  coverImage: { not: null },
  NOT: { coverImage: "" },
} as const;

function normalizePost<T extends PostCard>(post: T, usePlaceholder = false): T {
  return {
    ...post,
    coverImage: usePlaceholder
      ? resolveCoverImage(post.coverImage, post.category?.slug)
      : (post.coverImage?.trim() ?? ""),
  };
}

function filterPostsWithCover<T extends { coverImage?: string | null }>(posts: T[]) {
  return posts.filter((p) => hasValidCover(p.coverImage));
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
    coverImage: post.coverImage?.trim() ?? "",
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
  const start = (page - 1) * limit;
  const mockPosts = filterPostsWithCover(MOCK_POSTS).slice(start, start + limit).map((p) => normalizePost(p));
  const mock = {
    posts: mockPosts,
    total: filterPostsWithCover(MOCK_POSTS).length,
    hasMore: start + limit < filterPostsWithCover(MOCK_POSTS).length,
  };

  if (!isDatabaseConfigured()) return mock;

  return dbQuery(async () => {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: postWithCoverWhere,
        orderBy: { publishedAt: "desc" },
        take: limit,
        skip,
        include: { author: true, category: true },
      }),
      prisma.post.count({ where: postWithCoverWhere }),
    ]);
    return {
      posts: posts.map(mapPost),
      total,
      hasMore: skip + posts.length < total,
    };
  }, mock);
}

const EXCLUDED_FEATURED_SLUGS = ["colapso-causa-animal-piraquara"];
const PREFERRED_FEATURED_SLUG = "servidor-saude-preso-piraquara";

export const getFeaturedPost = unstable_cache(
  async (): Promise<PostCard | null> => {
    const withCover = filterPostsWithCover(MOCK_POSTS).filter(
      (p) => !EXCLUDED_FEATURED_SLUGS.includes(p.slug)
    );
    const mockFeatured =
      withCover.find((p) => p.slug === PREFERRED_FEATURED_SLUG) ??
      withCover.find((p) => p.featured) ??
      withCover[0];
    const mock = mockFeatured ? normalizePost(mockFeatured) : null;

    if (!isDatabaseConfigured()) return mock;

    return dbQuery(async () => {
      const preferred = await prisma.post.findFirst({
        where: {
          ...postWithCoverWhere,
          slug: PREFERRED_FEATURED_SLUG,
        },
        include: { author: true, category: true },
      });
      if (preferred) return mapPost(preferred);

      const post = await prisma.post.findFirst({
        where: {
          ...postWithCoverWhere,
          featured: true,
          slug: { notIn: EXCLUDED_FEATURED_SLUGS },
        },
        orderBy: { publishedAt: "desc" },
        include: { author: true, category: true },
      });
      if (post) return mapPost(post);

      const fallback = await prisma.post.findFirst({
        where: {
          ...postWithCoverWhere,
          slug: { notIn: EXCLUDED_FEATURED_SLUGS },
        },
        orderBy: { publishedAt: "desc" },
        include: { author: true, category: true },
      });
      return fallback ? mapPost(fallback) : null;
    }, mock);
  },
  ["featured-post"],
  { revalidate: 60 }
);

export async function getPopularPosts(limit = 5) {
  const mock = filterPostsWithCover(MOCK_POSTS)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
    .map((p) => normalizePost(p));
  if (!isDatabaseConfigured()) return mock;

  return dbQuery(async () => {
    const posts = await prisma.post.findMany({
      where: postWithCoverWhere,
      orderBy: { views: "desc" },
      take: limit,
      include: { author: true, category: true },
    });
    return posts.map(mapPost);
  }, mock);
}

export async function getRecentPosts(limit = 6, excludeSlug?: string) {
  const { posts } = await getPublishedPosts(limit + 5);
  return posts.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  description?: string | null;
  createdAt?: Date;
};

export async function getCategories(): Promise<CategoryRow[]> {
  if (!isDatabaseConfigured()) return MOCK_CATEGORIES;
  return dbQuery<CategoryRow[]>(
    () => prisma.category.findMany({ orderBy: { name: "asc" } }),
    MOCK_CATEGORIES
  );
}

function toPostDetail(
  card: PostCard,
  extra: { content: string; seoTitle?: string | null; seoDescription?: string | null; updatedAt?: Date }
): PostDetail {
  return {
    ...card,
    coverImage: resolveCoverImage(card.coverImage || null, card.category?.slug),
    ...extra,
  };
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const mockPost = MOCK_POSTS.find((p) => p.slug === slug && hasValidCover(p.coverImage));
  const mockDetail = mockPost
    ? toPostDetail(normalizePost(mockPost), {
        content: MOCK_POST_CONTENT[slug] ?? `<p>${mockPost.excerpt ?? ""}</p>`,
      })
    : null;

  if (!isDatabaseConfigured()) return mockDetail;

  return dbQuery(async () => {
    const post = await prisma.post.findUnique({
      where: { slug, published: true },
      include: { author: true, category: true },
    });
    if (!post || !hasValidCover(post.coverImage)) return null;

    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    return toPostDetail(mapPost(post), {
      content: post.content,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      updatedAt: post.updatedAt,
    });
  }, mockDetail);
}

type PostsByCategoryResult = {
  category: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
    description?: string | null;
    createdAt?: Date;
  } | null;
  posts: PostCard[];
};

export async function getPostsByCategory(slug: string, limit = 12): Promise<PostsByCategoryResult> {
  const cat = MOCK_CATEGORIES.find((c) => c.slug === slug);
  const mock: PostsByCategoryResult = !cat
    ? { category: null, posts: [] }
    : {
        category: cat,
        posts: filterPostsWithCover(MOCK_POSTS)
          .filter((p) => p.category?.slug === slug)
          .slice(0, limit)
          .map((p) => normalizePost(p)),
      };

  if (!isDatabaseConfigured()) return mock;

  return dbQuery<PostsByCategoryResult>(async () => {
    const category = await prisma.category.findUnique({ where: { slug } });
    if (!category) return { category: null, posts: [] as PostCard[] };

    const posts = await prisma.post.findMany({
      where: { ...postWithCoverWhere, categoryId: category.id },
      orderBy: { publishedAt: "desc" },
      take: limit,
      include: { author: true, category: true },
    });

    return { category, posts: posts.map(mapPost) };
  }, mock);
}

export async function searchPosts(query: string, limit = 20) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  if (!isDatabaseConfigured()) {
    return filterPostsWithCover(MOCK_POSTS)
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.category?.name.toLowerCase().includes(q)
      )
      .slice(0, limit)
      .map((p) => normalizePost(p));
  }

  return dbQuery(async () => {
    const posts = await prisma.post.findMany({
      where: {
        ...postWithCoverWhere,
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
  }, []);
}

export function generateSlug(title: string) {
  return slugify(title, { lower: true, strict: true, locale: "pt" });
}

export async function getAllPostSlugs() {
  const mock = filterPostsWithCover(MOCK_POSTS).map((p) => ({ slug: p.slug, updatedAt: new Date() }));
  if (!isDatabaseConfigured()) return mock;

  return dbQuery(
    () =>
      prisma.post.findMany({
        where: postWithCoverWhere,
        select: { slug: true, updatedAt: true },
      }),
    mock
  );
}

export type CreatePostInput = {
  title: string;
  subtitle?: string;
  content: string;
  excerpt?: string;
  coverImage?: string | null;
  categoryId?: string | null;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  authorId: string;
};

export async function createPublishedPost(input: CreatePostInput) {
  if (!isDatabaseConfigured()) {
    throw new Error("Configure DATABASE_URL para publicar matérias.");
  }

  let slug = generateSlug(input.title);
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  const category = input.categoryId
    ? await prisma.category.findUnique({ where: { id: input.categoryId } })
    : null;

  const coverImage =
    input.coverImage?.trim() ||
    resolveCoverImage(null, category?.slug ?? null);

  const post = await prisma.post.create({
    data: {
      title: input.title,
      subtitle: input.subtitle,
      slug,
      excerpt: input.excerpt,
      content: input.content,
      coverImage,
      published: true,
      featured: input.featured ?? false,
      publishedAt: new Date(),
      authorId: input.authorId,
      categoryId: input.categoryId,
      seoTitle: input.seoTitle,
      seoDescription: input.seoDescription,
    },
  });

  return post;
}
