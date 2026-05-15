import Link from "next/link";
import { ABOUT_INTRO, SITE } from "@/lib/constants";
import { ValuePillarNav, ValuePillarSections } from "@/components/about/value-pillars";

export function AboutSection() {
  return (
    <>
      <section
        id="sobre"
        className="scroll-mt-24 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"
      >
        <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Quem somos</h2>
        <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">{SITE.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{ABOUT_INTRO}</p>
        <Link
          href="/#pilares"
          className="mt-4 inline-block text-xs font-semibold text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
        >
          Nossos pilares ↓
        </Link>
      </section>

      <section className="mt-6 space-y-4">
        <ValuePillarNav />
        <ValuePillarSections />
      </section>
    </>
  );
}
