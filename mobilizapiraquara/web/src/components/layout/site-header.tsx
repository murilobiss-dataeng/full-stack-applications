import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black">
      <div className="site-container flex flex-col items-center py-5">
        <Logo size="lg" href="/#inicio" className="items-center" />
        <p className="mt-3 text-center text-sm font-medium text-zinc-300 sm:text-base">
          {SITE.tagline}
        </p>
        <nav
          className="mt-5 flex w-full flex-wrap items-center justify-center gap-2"
          aria-label="Principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/publique"
            className="rounded-full border border-zinc-500 bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Administrativo
          </Link>
        </nav>
      </div>
    </header>
  );
}
