import Link from "next/link";
import { PostCover } from "@/components/news/post-cover";
import type { PostCard } from "@/types/post";
import { formatRelativeDate } from "@/lib/utils";

const EXCLUDED_SLUGS = ["colapso-causa-animal-piraquara"];
const PREFERRED_FEATURED_SLUG = "servidor-saude-preso-piraquara";

export function pickMainAndSide(posts: PostCard[], featured: PostCard | null) {
  const filtered = posts.filter((p) => !EXCLUDED_SLUGS.includes(p.slug) && p.coverImage?.trim());

  const main =
    featured && !EXCLUDED_SLUGS.includes(featured.slug)
      ? featured
      : filtered.find((p) => p.slug === PREFERRED_FEATURED_SLUG) ??
        filtered.find((p) => p.featured) ??
        filtered[0] ??
        null;

  const side = filtered.filter((p) => p.slug !== main?.slug).slice(0, 8);

  return { main, side };
}

type Props = {
  featured: PostCard | null;
  posts: PostCard[];
};

export function NewsPanel({ featured, posts }: Props) {
  const { main, side } = pickMainAndSide(posts, featured);

  if (!main) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-sm text-zinc-500">
        Nenhuma notícia nesta categoria no momento.
      </p>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,280px)] lg:gap-5">
      <Link
        href={`/noticia/${main.slug}`}
        className="group block overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 transition hover:border-zinc-400 hover:shadow-md"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 lg:aspect-[16/11]">
          <PostCover
            src={main.coverImage}
            alt={main.title}
            categorySlug={main.category?.slug}
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority
            className="transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-4 sm:p-5">
          {main.category && (
            <span
              className="text-[10px] font-bold uppercase tracking-wide"
              style={{ color: main.category.color ?? "#52525b" }}
            >
              {main.category.name}
            </span>
          )}
          <h3 className="mt-2 text-lg font-bold leading-snug text-zinc-900 sm:text-xl">{main.title}</h3>
          {main.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{main.excerpt}</p>
          )}
          {main.publishedAt && (
            <time className="mt-3 block text-xs text-zinc-500" dateTime={String(main.publishedAt)}>
              {formatRelativeDate(main.publishedAt)}
            </time>
          )}
        </div>
      </Link>

      <aside className="flex min-h-0 flex-col rounded-lg border border-zinc-200 bg-white">
        <p className="shrink-0 border-b border-zinc-200 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-zinc-500">
          Mais notícias
        </p>
        <ul className="max-h-[420px] flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
          {side.map((post) => (
            <li key={post.id} className="border-b border-zinc-100 last:border-0">
              <Link
                href={`/noticia/${post.slug}`}
                className="flex gap-3 p-3 transition hover:bg-zinc-50"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                  <PostCover
                    src={post.coverImage}
                    alt={post.title}
                    categorySlug={post.category?.slug}
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  {post.category && (
                    <span
                      className="text-[10px] font-bold uppercase"
                      style={{ color: post.category.color ?? "#71717a" }}
                    >
                      {post.category.name}
                    </span>
                  )}
                  <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
                    {post.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
