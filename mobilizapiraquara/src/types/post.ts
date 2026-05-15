export type CategorySummary = {
  id: string;
  name: string;
  slug: string;
  color?: string | null;
};

export type AuthorSummary = {
  name: string;
};

export type PostCard = {
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt: Date | string | null;
  featured: boolean;
  views: number;
  category?: CategorySummary | null;
  author: AuthorSummary;
};

export type PostDetail = PostCard & {
  content: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  updatedAt?: Date | string;
};
