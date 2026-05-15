import Link from "next/link";

type Cat = { id: string; name: string; slug: string; color?: string | null };

export function CategoryPills({ categories }: { categories: Cat[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categoria/${cat.slug}`}
          className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-800 hover:bg-zinc-900 hover:text-white dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
