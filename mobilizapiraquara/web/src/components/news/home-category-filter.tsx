"use client";

import { cn } from "@/lib/utils";

type Category = { id: string; name: string; slug: string; color?: string | null };

type Props = {
  categories: Category[];
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
};

export function HomeCategoryFilter({ categories, selectedSlug, onSelect }: Props) {
  return (
    <div
      className="flex flex-wrap gap-2 border-b border-zinc-200 bg-zinc-50/80 px-4 py-3 sm:px-5"
      role="group"
      aria-label="Filtrar notícias por categoria"
    >
      <FilterChip active={selectedSlug === null} onClick={() => onSelect(null)}>
        Todas
      </FilterChip>
      {categories.map((cat) => (
        <FilterChip
          key={cat.id}
          active={selectedSlug === cat.slug}
          onClick={() => onSelect(cat.slug)}
          accent={cat.color ?? undefined}
        >
          {cat.name}
        </FilterChip>
      ))}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
  accent,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1 text-xs font-semibold transition sm:text-sm",
        active
          ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
          : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100"
      )}
      style={
        active && accent
          ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
          : !active && accent
            ? { borderColor: `${accent}55` }
            : undefined
      }
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
