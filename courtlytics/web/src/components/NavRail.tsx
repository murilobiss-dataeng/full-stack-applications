"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavRailSection = {
  id: string;
  label: string;
  /** One line under the label (optional) */
  hint?: string;
};

type NavRailProps = {
  sections: NavRailSection[];
  /** Query key, e.g. `section` → `?section=pipeline` */
  paramName: string;
  /** Path for `router.replace` (no trailing slash) */
  basePath: string;
  panels: Record<string, React.ReactNode>;
};

export function NavRail({ sections, paramName, basePath, panels }: NavRailProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeId = useMemo(() => {
    const raw = searchParams.get(paramName);
    if (raw && sections.some((s) => s.id === raw)) return raw;
    return sections[0]?.id ?? "";
  }, [paramName, searchParams, sections]);

  const setActive = useCallback(
    (id: string) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set(paramName, id);
      router.replace(`${basePath}?${next.toString()}`, { scroll: false });
    },
    [basePath, paramName, router, searchParams],
  );

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
      <nav
        className="flex shrink-0 flex-col gap-1.5 lg:w-56"
        aria-label="Sections"
      >
        {sections.map((s) => {
          const on = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
                on
                  ? "border-primary/50 bg-primary/10 text-foreground shadow-sm"
                  : "border-transparent bg-muted/20 text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground",
              )}
            >
              <span className="block text-sm font-semibold tracking-tight">{s.label}</span>
              {s.hint ? <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{s.hint}</span> : null}
            </button>
          );
        })}
      </nav>
      <div className="min-w-0 flex-1 rounded-2xl border border-border/80 bg-card/40 p-4 shadow-sm sm:p-6">
        {panels[activeId] ?? null}
      </div>
    </div>
  );
}
