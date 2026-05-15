import Link from "next/link";
import type { PostCard } from "@/types/post";
import { formatDate } from "@/lib/utils";
import { PostCover } from "@/components/news/post-cover";

export function HeroFeatured({ post }: { post: PostCard }) {
  const categoryColor = post.category?.color ?? "#52525b";

  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group flex gap-3 overflow-hidden rounded-lg border border-zinc-200 bg-white p-2 transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600 sm:gap-4 sm:p-3"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-zinc-100 sm:h-24 sm:w-36 dark:bg-zinc-800">
        <PostCover
          src={post.coverImage}
          alt={post.title}
          categorySlug={post.category?.slug}
          sizes="144px"
          priority
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {post.category && (
          <span
            className="mb-1 w-fit rounded px-1.5 py-0.5 text-[10px] font-bold uppercase text-white"
            style={{ backgroundColor: categoryColor }}
          >
            {post.category.name}
          </span>
        )}
        <h2 className="line-clamp-2 font-serif text-base font-bold leading-snug text-zinc-900 group-hover:text-zinc-600 dark:text-white sm:text-lg">
          {post.title}
        </h2>
        {post.publishedAt && (
          <time className="mt-1 text-[11px] text-zinc-500" dateTime={String(post.publishedAt)}>
            {formatDate(post.publishedAt)}
          </time>
        )}
      </div>
    </Link>
  );
}
