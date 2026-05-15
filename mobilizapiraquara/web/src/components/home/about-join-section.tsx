import Link from "next/link";
import { ABOUT_INTRO, ABOUT_VALUES, SITE } from "@/lib/constants";
import { JoinForm } from "@/components/forms/join-form";
import { SocialLinks } from "@/components/layout/social-links";

export function AboutJoinSection() {
  return (
    <section className="scroll-mt-28 space-y-8">
      <div
        id="sobre"
        className="scroll-mt-28 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-zinc-100/80 p-6 shadow-sm sm:p-8"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Quem somos</p>
        <h2 className="font-serif mt-3 text-2xl font-semibold leading-tight text-zinc-900 sm:text-3xl">
          Transparência e união por Piraquara
        </h2>
        <p className="font-serif mt-5 text-base leading-relaxed text-zinc-700 sm:text-lg sm:leading-relaxed">
          {ABOUT_INTRO}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
        <div id="pilares" className="scroll-mt-28 flex flex-col">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Nossos pilares
          </h3>
          <ul className="flex flex-1 flex-col gap-3">
            {ABOUT_VALUES.map((v) => (
              <li key={v.id}>
                <Link
                  href={`/#${v.id}`}
                  id={v.id}
                  className="group flex scroll-mt-28 flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-400 hover:shadow-md sm:p-5"
                >
                  <span className="text-2xl" role="img" aria-hidden>
                    {v.icon}
                  </span>
                  <span className="mt-2 text-base font-bold text-zinc-900 group-hover:text-zinc-700">
                    {v.title}
                  </span>
                  <span className="mt-1.5 text-sm leading-relaxed text-zinc-600">{v.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          id="junte-se"
          className="scroll-mt-28 flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Junte-se a nós</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            {SITE.name} é independente da prefeitura. Deixe nome e WhatsApp para contato.
          </p>
          <div className="mt-4 flex-1">
            <JoinForm />
          </div>
          <div className="mt-6 border-t border-zinc-200 pt-4">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
