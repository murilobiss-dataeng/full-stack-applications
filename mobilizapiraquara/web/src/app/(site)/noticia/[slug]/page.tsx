import type { Metadata } from "next";
import { PostCover } from "@/components/news/post-cover";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts } from "@/services/posts";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { NewsScrollRow } from "@/components/news/news-scroll-row";

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

  const related = await getRecentPosts(6, post.slug);

  return (
    <article className="site-container py-8 sm:py-10">
      <header className="border-b border-zinc-800 pb-6">
        {post.category && (
          <Link
            href={`/categoria/${post.category.slug}`}
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white"
          >
            {post.category.name}
          </Link>
        )}
        <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">{post.title}</h1>
        {post.subtitle && (
          <p className="mt-3 text-lg leading-relaxed text-zinc-400">{post.subtitle}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-4 text-sm text-zinc-500">
          <span>{post.author.name}</span>
          {post.publishedAt && (
            <time dateTime={String(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
          )}
        </div>
      </header>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <PostCover
          src={post.coverImage}
          alt={post.title}
          categorySlug={post.category?.slug}
          sizes="(max-width: 896px) 100vw, 896px"
          priority
        />
      </div>

      <div className="article-prose mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />

      {related.length > 0 && (
        <section className="mt-12 border-t border-zinc-800 pt-8">
          <NewsScrollRow posts={related} title="Leia também" />
        </section>
      )}
    </article>
  );
}
