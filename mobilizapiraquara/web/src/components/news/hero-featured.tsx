import Link from "next/link";
import type { PostCard } from "@/types/post";
import { formatDate } from "@/lib/utils";
import { PostCover } from "@/components/news/post-cover";

export function HeroFeatured({ post }: { post: PostCard }) {
  const categoryColor = post.category?.color ?? "#52525b";

  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl shadow-2xl"
    >
      <div className="relative aspect-[21/9] min-h-[280px] w-full sm:min-h-[360px]">
        <PostCover
          src={post.coverImage}
          alt={post.title}
          categorySlug={post.category?.slug}
          sizes="100vw"
          priority
          className="transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
          {post.category && (
            <span
              className="mb-3 inline-block w-fit rounded px-2 py-1 text-xs font-bold uppercase text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {post.category.name}
            </span>
          )}
          <h2 className="max-w-4xl font-serif text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h2>
          {post.subtitle && (
            <p className="mt-3 max-w-3xl text-base text-slate-200 sm:text-lg">{post.subtitle}</p>
          )}
          {post.publishedAt && (
            <time className="mt-4 text-sm text-slate-300" dateTime={String(post.publishedAt)}>
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </Link>
  );
}
