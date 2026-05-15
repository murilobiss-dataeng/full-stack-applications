import { ABOUT_INTRO, ABOUT_VALUES, SITE } from "@/lib/constants";
import { JoinForm } from "@/components/forms/join-form";
import { SocialLinks } from "@/components/layout/social-links";

export function AboutJoinSection() {
  return (
    <section className="scroll-mt-28 space-y-4">
      <div id="sobre" className="scroll-mt-28">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Quem somos</h2>
        <p className="mt-2 text-sm text-zinc-400">{ABOUT_INTRO}</p>
      </div>

      <div className="card-dark grid gap-6 p-5 sm:grid-cols-2 sm:gap-8 sm:p-6">
        <div id="pilares" className="scroll-mt-28">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Nossos pilares</h3>
          <ul className="mt-4 space-y-4">
            {ABOUT_VALUES.map((v) => (
              <li key={v.id} id={v.id} className="scroll-mt-28 border-l-2 border-zinc-700 pl-4">
                <p className="text-sm font-bold text-white">
                  <span className="mr-2" role="img" aria-hidden>
                    {v.icon}
                  </span>
                  {v.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{v.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div id="junte-se" className="scroll-mt-28 flex flex-col border-t border-zinc-800 pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Junte-se a nós</h3>
          <p className="mt-2 text-sm text-zinc-400">
            {SITE.name} é independente da prefeitura. Deixe nome e WhatsApp para contato.
          </p>
          <div className="mt-4 flex-1">
            <JoinForm />
          </div>
          <div className="mt-6 border-t border-zinc-800 pt-4">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
