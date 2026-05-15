import type { Metadata } from "next";
import { PostCover } from "@/components/news/post-cover";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts } from "@/services/posts";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { PostCard } from "@/components/news/post-card";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Notícia não encontrada" };

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? post.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt ? String(post.publishedAt) : undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export const revalidate = 60;

export default async function NoticiaPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const related = await getRecentPosts(4, post.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
        {post.category && (
          <Link
            href={`/categoria/${post.category.slug}`}
            className="text-xs font-bold uppercase tracking-widest text-zinc-600 hover:underline dark:text-zinc-400"
          >
            {post.category.name}
          </Link>
        )}
        <h1 className="mt-3 font-serif text-3xl font-bold leading-[1.15] text-zinc-900 dark:text-white sm:text-4xl">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
            {post.subtitle}
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{post.author.name}</span>
          {post.publishedAt && (
            <time dateTime={String(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
          )}
        </div>
      </header>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
        <PostCover
          src={post.coverImage}
          alt={post.title}
          categorySlug={post.category?.slug}
          sizes="(max-width:768px) 100vw, 768px"
          priority
        />
      </div>

      <div className="article-prose mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <h2 className="mb-6 font-serif text-2xl font-bold text-zinc-900 dark:text-white">Leia também</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.id} post={p} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
