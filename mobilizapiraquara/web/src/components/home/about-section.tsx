import Link from "next/link";
import { ABOUT_INTRO, SITE } from "@/lib/constants";
import { ValuePillarNav, ValuePillarSections } from "@/components/about/value-pillars";

export function AboutSection() {
  return (
    <>
      <section
        id="sobre"
        className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-10"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Quem somos
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {SITE.name}
        </h2>
        <p className="mt-3 text-lg font-medium text-brand-700 dark:text-brand-300">{SITE.tagline}</p>
        <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          {ABOUT_INTRO}
        </p>
        <p className="mt-6">
          <Link
            href="/#pilares"
            className="inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Ver nossos pilares ↓
          </Link>
        </p>
      </section>

      <section className="mt-10 sm:mt-12">
        <ValuePillarNav />
        <ValuePillarSections />
      </section>
    </>
  );
}
