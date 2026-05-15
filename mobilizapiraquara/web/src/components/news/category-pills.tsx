import Link from "next/link";

type Cat = { id: string; name: string; slug: string; color?: string | null };

export function CategoryPills({ categories }: { categories: Cat[] }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categoria/${cat.slug}`}
          className="shrink-0 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
