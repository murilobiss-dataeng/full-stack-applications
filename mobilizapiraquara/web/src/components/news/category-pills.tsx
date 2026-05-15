import Link from "next/link";

type Cat = { id: string; name: string; slug: string; color?: string | null };

export function CategoryPills({ categories }: { categories: Cat[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categoria/${cat.slug}`}
          className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
