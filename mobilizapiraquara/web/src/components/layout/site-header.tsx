import Link from "next/link";
import { Search } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchDialog } from "@/components/news/search-dialog";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-zinc-50/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <Logo size="md" href="/#inicio" />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-brand-950 dark:hover:text-brand-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <SearchDialog trigger={<Search className="h-5 w-5" />} />
          <ThemeToggle />
          <Link
            href="/#junte-se"
            className="hidden rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black sm:inline-flex dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Junte-se
          </Link>
        </div>
      </div>

      <nav
        className="flex gap-1.5 overflow-x-auto border-t border-slate-100 px-3 py-2 lg:hidden dark:border-slate-800"
        aria-label="Mobile"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
