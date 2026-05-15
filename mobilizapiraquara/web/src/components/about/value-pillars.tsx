"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ABOUT_VALUES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ValuePillarNav() {
  const [active, setActive] = useState<string>(ABOUT_VALUES[0].id);

  useEffect(() => {
    const sections = ABOUT_VALUES.map((v) => document.getElementById(v.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      id="pilares"
      aria-label="Nossos pilares"
      className="scroll-mt-24"
    >
      <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Nossos pilares
      </p>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-thin sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
        {ABOUT_VALUES.map((value) => {
          const isActive = active === value.id;
          return (
            <Link
              key={value.id}
              href={`#${value.id}`}
              onClick={() => setActive(value.id)}
              className={cn(
                "flex min-w-[min(100%,280px)] shrink-0 snap-center items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all sm:min-w-0 sm:flex-col sm:items-center sm:px-4 sm:py-5 sm:text-center",
                isActive
                  ? "border-brand-500 bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                  : "border-slate-200 bg-white text-slate-800 hover:border-brand-300 hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-brand-600 dark:hover:bg-brand-950"
              )}
            >
              <span className="text-2xl sm:text-3xl" role="img" aria-hidden>
                {value.icon}
              </span>
              <span className="font-serif text-sm font-bold leading-tight sm:text-base">{value.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function ValuePillarSections() {
  return (
    <div className="mt-10 space-y-6 sm:space-y-8">
      {ABOUT_VALUES.map((value, index) => (
        <section
          key={value.id}
          id={value.id}
          aria-labelledby={`${value.id}-title`}
          className={cn(
            "scroll-mt-28 rounded-2xl border-2 bg-gradient-to-br p-6 sm:p-10",
            value.accent
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-sm dark:bg-slate-900/80"
              role="img"
              aria-hidden
            >
              {value.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Pilar {index + 1} de {ABOUT_VALUES.length}
              </p>
              <h2
                id={`${value.id}-title`}
                className="mt-1 font-serif text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl"
              >
                {value.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
                {value.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
