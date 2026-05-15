import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/layout/social-links";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="site-container space-y-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <Logo size="sm" linked />
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/publique" className="text-xs font-semibold text-zinc-800 hover:underline dark:text-zinc-200">
                  Administrativo
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <SocialLinks />
        <p className="text-center text-[11px] text-zinc-500 sm:text-left">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
