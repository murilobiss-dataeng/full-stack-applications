"use client";

import { useCallback, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = { id: string; label: string; content: ReactNode };

type TabPanelProps = {
  tabs: TabItem[];
  className?: string;
  /** Accessible label for the tablist */
  ariaLabel?: string;
};

export function TabPanel({ tabs, className, ariaLabel = "Sections" }: TabPanelProps) {
  const baseId = useId().replace(/:/g, "");
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  const go = useCallback(
    (delta: number) => {
      const idx = tabs.findIndex((t) => t.id === active);
      if (idx < 0) return;
      const next = (idx + delta + tabs.length) % tabs.length;
      setActive(tabs[next].id);
    },
    [active, tabs],
  );

  const onTablistKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).getAttribute("role") !== "tab") return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(tabs[0].id);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(tabs[tabs.length - 1].id);
    }
  };

  if (!tabs.length) return null;

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onTablistKeyDown}
        className="flex flex-wrap gap-1 rounded-xl border border-border bg-muted/20 p-1 shadow-sm"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${t.id}`}
            aria-controls={`${baseId}-panel-${t.id}`}
            aria-selected={active === t.id}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:text-sm",
              active === t.id
                ? "bg-card text-foreground shadow-sm ring-1 ring-border/80"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">Tip: focus a tab, then use ← → Home End.</p>
      <div
        key={active}
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="animate-fade-panel mt-3 rounded-xl border border-border/60 bg-card/30 p-4 sm:p-5"
      >
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}
