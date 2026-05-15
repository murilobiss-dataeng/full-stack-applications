import Link from "next/link";
import { PostCover } from "@/components/news/post-cover";
import type { PostCard } from "@/types/post";
import { formatRelativeDate } from "@/lib/utils";

type Props = {
  posts: PostCard[];
  title?: string;
};

export function NewsScrollRow({ posts, title = "Mais notícias" }: Props) {
  if (!posts.length) return null;

  return (
    <div>
      <h3 className="mb-3 text-center text-xs font-bold uppercase tracking-wide text-zinc-500">
        {title}
      </h3>
      <div
        className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin] sm:-mx-6 sm:px-6"
        aria-label={title}
      >
        {posts.map((post) => {
          const categoryColor = post.category?.color ?? "#71717a";
          return (
            <Link
              key={post.id}
              href={`/noticia/${post.slug}`}
              className="group w-[260px] shrink-0 snap-start overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition hover:border-zinc-600 sm:w-[280px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <PostCover
                  src={post.coverImage}
                  alt={post.title}
                  categorySlug={post.category?.slug}
                  sizes="280px"
                />
              </div>
              <div className="p-3">
                {post.category && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: categoryColor }}
                  >
                    {post.category.name}
                  </span>
                )}
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-zinc-300">
                  {post.title}
                </p>
                {post.publishedAt && (
                  <time className="mt-1 block text-[11px] text-zinc-500" dateTime={String(post.publishedAt)}>
                    {formatRelativeDate(post.publishedAt)}
                  </time>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
