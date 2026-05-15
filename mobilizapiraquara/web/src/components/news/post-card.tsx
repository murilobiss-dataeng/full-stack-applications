import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { PostCover } from "@/components/news/post-cover";
import type { PostCard as PostCardType } from "@/types/post";
import { formatRelativeDate, cn } from "@/lib/utils";

type Props = {
  post: PostCardType;
  variant?: "default" | "compact" | "horizontal";
  priority?: boolean;
};

export function PostCard({ post, variant = "default", priority = false }: Props) {
  const href = `/noticia/${post.slug}`;
  const categoryColor = post.category?.color ?? "#0d9488";

  if (variant === "horizontal") {
    return (
      <Link
        href={href}
        className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-brand-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-700"
      >
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
          <PostCover
            src={post.coverImage}
            alt={post.title}
            categorySlug={post.category?.slug}
            sizes="128px"
            priority={priority}
          />
        </div>
        <div className="min-w-0 flex-1">
          {post.category && (
            <span className="text-xs font-bold uppercase" style={{ color: categoryColor }}>
              {post.category.name}
            </span>
          )}
          <h3 className="mt-1 line-clamp-2 font-serif text-sm font-bold leading-snug text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
            {post.title}
          </h3>
          <PostMeta post={post} compact />
        </div>
      </Link>
    );
  }

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-700",
        variant === "compact" && "flex flex-row"
      )}
    >
      <Link href={href} className={cn("block", variant === "compact" ? "w-2/5" : "w-full")}>
        <div
          className={cn(
            "relative overflow-hidden bg-slate-200 dark:bg-slate-800",
            variant === "compact" ? "h-full min-h-[120px]" : "aspect-[16/10]"
          )}
        >
          <PostCover
            src={post.coverImage}
            alt={post.title}
            categorySlug={post.category?.slug}
            sizes={variant === "compact" ? "200px" : "(max-width:768px) 100vw, 33vw"}
            priority={priority}
          />
          {post.featured && variant !== "compact" && (
            <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-0.5 text-xs font-bold uppercase text-white">
              Destaque
            </span>
          )}
        </div>
      </Link>
      <div className={cn("p-4", variant === "compact" && "flex w-3/5 flex-col justify-center")}>
        {post.category && (
          <Link
            href={`/categoria/${post.category.slug}`}
            className="text-xs font-bold uppercase tracking-wide hover:underline"
            style={{ color: categoryColor }}
          >
            {post.category.name}
          </Link>
        )}
        <Link href={href}>
          <h3
            className={cn(
              "mt-2 font-serif font-bold leading-snug text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300",
              variant === "compact" ? "line-clamp-3 text-base" : "line-clamp-3 text-lg"
            )}
          >
            {post.title}
          </h3>
        </Link>
        {post.excerpt && variant !== "compact" && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
        )}
        <PostMeta post={post} />
      </div>
    </article>
  );
}

function PostMeta({ post, compact }: { post: PostCardType; compact?: boolean }) {
  return (
    <div className={cn("mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400", compact && "mt-2")}>
      {post.publishedAt && (
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {formatRelativeDate(post.publishedAt)}
        </span>
      )}
      <span className="flex items-center gap-1">
        <Eye className="h-3.5 w-3.5" />
        {post.views.toLocaleString("pt-BR")}
      </span>
    </div>
  );
}
