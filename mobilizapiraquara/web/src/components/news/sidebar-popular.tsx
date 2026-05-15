import Link from "next/link";
import type { PostCard as PostCardType } from "@/types/post";
import { TrendingUp } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";

export function SidebarPopular({ posts }: { posts: PostCardType[] }) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 flex items-center gap-2 font-sans text-lg font-bold text-slate-900 dark:text-white">
        <TrendingUp className="h-5 w-5 text-brand-600" />
        Mais lidas
      </h2>
      <ol className="space-y-4">
        {posts.map((post, i) => (
          <li key={post.id} className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              {i + 1}
            </span>
            <div className="min-w-0">
              <Link
                href={`/noticia/${post.slug}`}
                className="line-clamp-3 font-sans text-sm font-bold leading-snug text-slate-900 hover:text-brand-700 dark:text-white dark:hover:text-brand-300"
              >
                {post.title}
              </Link>
              {post.publishedAt && (
                <p className="mt-1 text-xs text-slate-500">{formatRelativeDate(post.publishedAt)}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
