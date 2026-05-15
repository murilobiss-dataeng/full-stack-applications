import { JoinForm } from "@/components/forms/join-form";
import { SocialLinks } from "@/components/layout/social-links";

export function JoinSection() {
  return (
    <section
      id="junte-se"
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="grid lg:grid-cols-2">
        <div className="border-b border-slate-200 p-6 dark:border-slate-700 sm:p-10 lg:border-b-0 lg:border-r">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Participe
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Junte-se a nós
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            O Mobiliza Piraquara é independente da prefeitura. Precisamos de moradores e lideranças que
            queiram contribuir com informação, mobilização e transparência.
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
            Preencha o formulário — entraremos em contato pelo WhatsApp.
          </p>
          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Redes sociais
            </p>
            <SocialLinks showLabels />
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Quero Saber Mais</h3>
          <p className="mt-1 text-sm text-slate-500">Nome completo e WhatsApp para contato.</p>
          <div className="mt-6">
            <JoinForm />
          </div>
        </div>
      </div>
    </section>
  );
}
