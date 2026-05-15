import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT_INTRO, SITE } from "@/lib/constants";
import { ValuePillarNav, ValuePillarSections } from "@/components/about/value-pillars";
import { SocialLinks } from "@/components/layout/social-links";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Quem Somos",
  description: ABOUT_INTRO,
  openGraph: {
    title: `Quem Somos | ${SITE.name}`,
    description: ABOUT_INTRO,
  },
};

export default function QuemSomosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section
        id="sobre"
        className="scroll-mt-24 relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-14 text-white shadow-xl sm:px-12"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-100">Sobre nós</p>
        <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">Quem somos</h1>
        <p className="mt-4 text-lg font-medium text-brand-100">{SITE.tagline}</p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-50">{ABOUT_INTRO}</p>
        <p className="mt-8">
          <Link
            href="#pilares"
            className="inline-flex rounded-lg bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
          >
            Conheça nossos pilares ↓
          </Link>
        </p>
      </section>

      <section className="mt-12 sm:mt-16">
        <ValuePillarNav />
        <ValuePillarSections />
      </section>

      <section
        id="participe"
        className="scroll-mt-24 mt-16 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-12"
      >
        <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
          Faça parte deste movimento
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
          Ajude Piraquara a ser um lugar cada vez melhor de se morar. Siga nossas redes e cadastre-se para
          receber novidades.
        </p>
        <div className="mt-6 flex justify-center">
          <SocialLinks showLabels />
        </div>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/junte-se">Junte-se a nós</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
