import Link from "next/link";

type Cat = { id: string; name: string; slug: string; color?: string | null };

export function CategoryPills({ categories }: { categories: Cat[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categoria/${cat.slug}`}
          className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-brand-600 hover:bg-brand-600 hover:text-white dark:border-slate-600 dark:text-slate-200"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
