import { ABOUT_INTRO, ABOUT_VALUES, SITE } from "@/lib/constants";

export function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-28 space-y-6">
      <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        Quem somos
      </h2>
      <div className="card-dark p-6 text-center sm:p-8">
        <p className="text-lg font-semibold text-white">{SITE.name}</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">{ABOUT_INTRO}</p>
      </div>

      <div id="pilares" className="scroll-mt-28 space-y-4">
        <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          Nossos pilares
        </h3>
        <ul className="grid gap-4 sm:grid-cols-3">
          {ABOUT_VALUES.map((v) => (
            <li key={v.id} id={v.id} className="card-dark scroll-mt-28 p-5 text-center">
              <span className="text-3xl" role="img" aria-hidden>
                {v.icon}
              </span>
              <p className="mt-3 text-sm font-bold text-white">{v.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{v.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
