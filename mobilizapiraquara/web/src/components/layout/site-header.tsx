import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="site-container flex items-center justify-between gap-3 py-2.5">
        <Logo size="sm" href="/#inicio" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#junte-se"
            className="hidden rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-semibold text-white sm:inline-flex dark:bg-zinc-100 dark:text-zinc-900"
          >
            Junte-se
          </Link>
        </div>
      </div>

      <nav
        className="site-container flex gap-1 overflow-x-auto border-t border-zinc-100 py-1.5 dark:border-zinc-800"
        aria-label="Principal"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/publique"
          className="shrink-0 rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Administrativo
        </Link>
      </nav>
    </header>
  );
}
