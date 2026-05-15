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
      { rootMargin: "-28% 0px -50% 0px", threshold: [0, 0.2, 0.4] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav id="pilares" aria-label="Nossos pilares" className="scroll-mt-28">
      <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Nossos pilares — toque para ir à seção
      </p>
      <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0">
        {ABOUT_VALUES.map((value) => {
          const isActive = active === value.id;
          return (
            <Link
              key={value.id}
              href={`/#${value.id}`}
              onClick={() => setActive(value.id)}
              className={cn(
                "flex min-w-[85%] shrink-0 snap-center flex-col items-center gap-2 rounded-2xl border-2 px-4 py-4 text-center transition-all sm:min-w-0",
                isActive
                  ? "scale-[1.02] border-zinc-700 bg-zinc-900 text-white shadow-lg shadow-black/20"
                  : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400 hover:shadow-md dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              )}
            >
              <span className="text-3xl" role="img" aria-hidden>
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
    <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
      {ABOUT_VALUES.map((value, index) => (
        <section
          key={value.id}
          id={value.id}
          aria-labelledby={`${value.id}-title`}
          className={cn(
            "scroll-mt-32 rounded-2xl border-2 bg-gradient-to-br p-5 sm:p-8",
            value.accent
          )}
        >
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-4xl shadow-md dark:bg-slate-900/90"
              role="img"
              aria-hidden
            >
              {value.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Pilar {index + 1} de {ABOUT_VALUES.length}
              </p>
              <h3
                id={`${value.id}-title`}
                className="mt-2 font-serif text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl"
              >
                {value.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
                {value.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
