import { ABOUT_INTRO, ABOUT_VALUES, SITE } from "@/lib/constants";

export function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-20 space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-500">Quem somos</h2>
      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{SITE.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{ABOUT_INTRO}</p>
      </div>

      <div id="pilares" className="scroll-mt-20">
        <p className="mb-2 text-xs font-medium text-zinc-500">Pilares</p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {ABOUT_VALUES.map((v) => (
            <li key={v.id} id={v.id} className="scroll-mt-24 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {v.icon} {v.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{v.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
