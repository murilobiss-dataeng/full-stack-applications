import Link from "next/link";
import { footerColumns } from "@/config/siteNav";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 text-sm text-muted-foreground md:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-10">
        <div className="lg:col-span-1">
          <p className="font-semibold tracking-tight text-foreground">Courtlytics</p>
          <p className="mt-2 max-w-xs text-xs leading-relaxed">
            Governed legal data: contracts, lineage, security, and cost-aware platform choices — portfolio demonstration.
          </p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link className="text-sm transition-colors duration-200 hover:text-foreground" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
