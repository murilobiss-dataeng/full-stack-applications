import Link from "next/link";
import { HOME_QUICK_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

export function HomeHero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-24 relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-black px-4 py-6 text-white sm:px-6 sm:py-8"
    >
      <div className="relative flex flex-col items-center text-center">
        <Logo size="md" linked={false} onDarkBackground className="items-center justify-center" />
        <p className="mt-3 max-w-md text-sm font-medium text-zinc-200">{SITE.tagline}</p>

        <nav
          aria-label="Atalhos das seções"
          className="mt-5 flex w-full max-w-md flex-wrap justify-center gap-2"
        >
          {HOME_QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-zinc-600/60 bg-zinc-800/60 px-3 py-1.5 text-xs font-semibold text-zinc-100 transition hover:bg-zinc-700"
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
