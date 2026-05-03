import Link from "next/link";

const footerCols = [
  {
    title: "Strategy",
    links: [
      { href: "/method", label: "Method" },
      { href: "/architecture", label: "Architecture" },
      { href: "/governance", label: "Governance & security" },
    ],
  },
  {
    title: "Data platform",
    links: [
      { href: "/data-pipeline", label: "Pipeline" },
      { href: "/data-modeling", label: "Modeling" },
      { href: "/source-of-truth", label: "Source of truth" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/case-study", label: "Case study" },
      { href: "/explorer", label: "Repo explorer" },
      { href: "/api/metrics", label: "API metrics" },
    ],
  },
] as const;

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
        {footerCols.map((col) => (
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
