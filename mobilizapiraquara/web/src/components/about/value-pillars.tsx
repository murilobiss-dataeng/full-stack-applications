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
    <nav id="pilares" aria-label="Nossos pilares" className="scroll-mt-24">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 snap-x snap-mandatory sm:mx-0 sm:px-0">
        {ABOUT_VALUES.map((value) => {
          const isActive = active === value.id;
          return (
            <Link
              key={value.id}
              href={`/#${value.id}`}
              onClick={() => setActive(value.id)}
              className={cn(
                "flex min-w-[140px] shrink-0 snap-center items-center gap-2 rounded-lg border px-3 py-2 text-left transition sm:min-w-0 sm:flex-1",
                isActive
                  ? "border-zinc-800 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              )}
            >
              <span className="text-xl" role="img" aria-hidden>
                {value.icon}
              </span>
              <span className="text-xs font-bold leading-tight">{value.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function ValuePillarSections() {
  return (
    <div className="space-y-3">
      {ABOUT_VALUES.map((value, index) => (
        <section
          key={value.id}
          id={value.id}
          aria-labelledby={`${value.id}-title`}
          className={cn("scroll-mt-28 rounded-lg border p-4", value.accent)}
        >
          <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
            Pilar {index + 1}
          </p>
          <h3
            id={`${value.id}-title`}
            className="mt-1 font-serif text-base font-bold text-zinc-900 dark:text-white"
          >
            {value.icon} {value.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{value.description}</p>
        </section>
      ))}
    </div>
  );
}
