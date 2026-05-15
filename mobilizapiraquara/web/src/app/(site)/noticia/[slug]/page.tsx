import type { Metadata } from "next";
import Image from "next/image";
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
    twitter: { card: "summary_large_image", title, description, images: post.coverImage ? [post.coverImage] : undefined },
  };
}

export const revalidate = 60;

export default async function NoticiaPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const related = await getRecentPosts(4, post.slug);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {post.category && (
        <Link
          href={`/categoria/${post.category.slug}`}
          className="text-sm font-bold uppercase tracking-wide text-brand-600 hover:underline dark:text-brand-400"
        >
          {post.category.name}
        </Link>
      )}
      <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>
      {post.subtitle && (
        <p className="mt-4 text-xl leading-relaxed text-slate-600 dark:text-slate-300">{post.subtitle}</p>
      )}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
        <span>{post.author.name}</span>
        {post.publishedAt && <time dateTime={String(post.publishedAt)}>{formatDate(post.publishedAt)}</time>}
      </div>

      {post.coverImage && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width:896px) 100vw, 896px" priority />
        </div>
      )}

      <div
        className="prose prose-lg prose-slate mt-10 max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-brand-600"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {related.length > 0 && (
        <section className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-700">
          <h2 className="mb-6 font-serif text-2xl font-bold">Leia também</h2>
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
