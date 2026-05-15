import Link from "next/link";
import { HOME_QUICK_LINKS, ABOUT_INTRO, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

export function HomeHero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-28 relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-brand-900 to-black px-5 py-10 text-white shadow-xl sm:px-10 sm:py-14"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-zinc-500/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <Logo size="lg" linked={false} onDarkBackground className="items-center justify-center" />
        <p className="mt-5 max-w-xl text-lg font-semibold text-zinc-100 sm:text-xl">{SITE.tagline}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{ABOUT_INTRO}</p>

        <nav
          aria-label="Atalhos das seções"
          className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
        >
          {HOME_QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 rounded-xl border border-zinc-600/50 bg-zinc-800/50 px-3 py-3 text-xs font-semibold text-zinc-100 backdrop-blur transition hover:border-zinc-500 hover:bg-zinc-700/60 sm:py-4 sm:text-sm"
            >
              <span className="text-lg sm:text-xl" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
