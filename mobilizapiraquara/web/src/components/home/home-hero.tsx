import Link from "next/link";
import { HOME_QUICK_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

export function HomeHero() {
  return (
    <section id="inicio" className="scroll-mt-20 rounded-lg border border-zinc-200 bg-zinc-900 px-4 py-5 text-white dark:border-zinc-700">
      <Logo size="sm" linked={false} onDarkBackground />
      <p className="mt-2 text-sm text-zinc-300">{SITE.tagline}</p>
      <nav aria-label="Atalhos" className="mt-3 flex flex-wrap gap-1.5">
        {HOME_QUICK_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-200 hover:bg-zinc-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
