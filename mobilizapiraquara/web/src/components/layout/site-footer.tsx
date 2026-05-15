import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/layout/social-links";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo size="sm" linked showTagline />
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{SITE.description}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navegação
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/busca"
                  className="text-sm text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  Buscar notícias
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Redes sociais
            </h3>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Acompanhe o Mobiliza Piraquara e participe do movimento.
            </p>
            <SocialLinks showLabels />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <Link href="/#junte-se" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            Quero fazer parte →
          </Link>
        </div>
      </div>
    </footer>
  );
}
