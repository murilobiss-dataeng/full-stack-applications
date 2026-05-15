import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/layout/social-links";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-zinc-800 bg-black">
      <div className="site-container space-y-6 py-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <Logo size="md" linked showTagline />
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-end">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/publique" className="text-sm font-semibold text-white hover:underline">
                  Administrativo
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-center sm:justify-start">
          <SocialLinks />
        </div>
        <p className="text-center text-xs text-zinc-500 sm:text-left">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
