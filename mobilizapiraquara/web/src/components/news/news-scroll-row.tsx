import Link from "next/link";
import { PostCover } from "@/components/news/post-cover";
import type { PostCard } from "@/types/post";
import { formatRelativeDate } from "@/lib/utils";

type Props = {
  posts: PostCard[];
  title?: string;
  seeAllHref?: string;
};

export function NewsScrollRow({ posts, title = "Últimas", seeAllHref = "/busca" }: Props) {
  if (!posts.length) return null;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <Link
          href={seeAllHref}
          className="shrink-0 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Ver todas →
        </Link>
      </div>

      <div
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        aria-label={title}
      >
        {posts.map((post) => {
          const categoryColor = post.category?.color ?? "#52525b";
          return (
            <Link
              key={post.id}
              href={`/noticia/${post.slug}`}
              className="group w-[220px] shrink-0 snap-start overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600 sm:w-[240px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <PostCover
                  src={post.coverImage}
                  alt={post.title}
                  categorySlug={post.category?.slug}
                  sizes="240px"
                />
              </div>
              <div className="p-2.5">
                {post.category && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: categoryColor }}
                  >
                    {post.category.name}
                  </span>
                )}
                <p className="mt-0.5 line-clamp-2 font-serif text-sm font-semibold leading-snug text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100">
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
