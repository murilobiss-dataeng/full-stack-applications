import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/layout/social-links";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-black text-zinc-300">
      <div className="site-container py-5 sm:py-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo size="sm" linked showTagline={false} className="items-center sm:items-start" />

          <nav aria-label="Rodapé" className="w-full sm:w-auto">
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="hidden h-3 w-px bg-zinc-700 sm:block" aria-hidden />
              <li>
                <Link
                  href="/publique"
                  className="text-xs font-semibold text-white transition hover:text-zinc-200"
                >
                  Administrativo
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 border-t border-zinc-800/80 pt-4 sm:flex-row sm:justify-between">
          <SocialLinks variant="dark" className="justify-center sm:justify-start" iconSize={18} />
          <p className="text-[11px] text-zinc-500">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
