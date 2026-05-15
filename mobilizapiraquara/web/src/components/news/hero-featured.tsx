import Link from "next/link";
import type { PostCard } from "@/types/post";
import { formatDate } from "@/lib/utils";
import { PostCover } from "@/components/news/post-cover";

export function HeroFeatured({ post }: { post: PostCard }) {
  const categoryColor = post.category?.color ?? "#71717a";

  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition hover:border-zinc-600"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
        <PostCover
          src={post.coverImage}
          alt={post.title}
          categorySlug={post.category?.slug}
          sizes="(max-width: 896px) 100vw, 896px"
          priority
          className="transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          {post.category && (
            <span
              className="mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {post.category.name}
            </span>
          )}
          <h2 className="line-clamp-3 text-lg font-bold leading-snug text-white sm:text-2xl">
            {post.title}
          </h2>
          {post.publishedAt && (
            <time className="mt-2 block text-xs text-zinc-400" dateTime={String(post.publishedAt)}>
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </Link>
  );
}
