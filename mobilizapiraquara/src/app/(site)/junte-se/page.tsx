import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JoinForm } from "@/components/forms/join-form";
import { SocialLinks } from "@/components/layout/social-links";

export const metadata: Metadata = {
  title: "Junte-se a nós",
  description:
    "Faça parte do Mobiliza Piraquara. Cadastre-se e ajude a construir uma Piraquara mais transparente e desenvolvida.",
  openGraph: {
    title: `Junte-se a nós | ${SITE.name}`,
    description: "Cadastre-se e participe do movimento por uma Piraquara melhor.",
  },
};

export default function JunteSePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <section>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Participe
          </p>
          <h1 className="font-serif text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Junte-se a nós
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            O Mobiliza Piraquara é um canal de comunicação independente. Precisamos de moradores, lideranças e
            voluntários que queiram contribuir com informação, mobilização e transparência na nossa cidade.
          </p>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Preencha o formulário e nossa equipe entrará em contato pelo WhatsApp informado.
          </p>

          <div className="mt-10">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Siga nas redes
            </h2>
            <SocialLinks showLabels />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-10">
          <h2 className="mb-6 font-serif text-2xl font-bold text-slate-900 dark:text-white">
            Quero Saber Mais
          </h2>
          <JoinForm />
        </section>
      </div>
    </div>
  );
}
