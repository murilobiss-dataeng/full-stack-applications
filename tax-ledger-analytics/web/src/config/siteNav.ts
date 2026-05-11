/**
 * Single source of truth for primary navigation. Keeps Navbar, mobile menu, and footer in sync.
 */

export type NavItem = { href: string; label: string; spotlight?: boolean };

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV", spotlight: true },
  { href: "/infrastructure", label: "Marts & modeling" },
  { href: "/source-of-truth", label: "Metric truth" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/dashboard", label: "BI surface" },
];

export const homeDocLinks: readonly { href: string; label: string }[] = [
  { href: "/cv", label: "CV + Analytics Engineering fit" },
  { href: "/ai-lab", label: "AI Lab (governed metrics)" },
  { href: "/infrastructure", label: "Marts, pipelines, and repo layout" },
  { href: "/source-of-truth", label: "Metric truth, scaffold, visualization" },
] as const;

export const footerColumns: readonly { title: string; links: readonly { href: string; label: string }[] }[] = [
  {
    title: "Hire signal",
    links: [
      { href: "/cv", label: "CV & role fit" },
      { href: "/dashboard", label: "BI surface" },
    ],
  },
  {
    title: "Data & marts",
    links: [
      { href: "/infrastructure", label: "Marts & modeling" },
      { href: "/infrastructure?section=explorer", label: "Repo explorer" },
    ],
  },
  {
    title: "Ship to analysts",
    links: [
      { href: "/ai-lab", label: "AI Lab" },
      { href: "/source-of-truth", label: "Metric truth" },
      { href: "/dashboard", label: "BI surface" },
      { href: "/api/metrics", label: "Metrics API" },
    ],
  },
] as const;
