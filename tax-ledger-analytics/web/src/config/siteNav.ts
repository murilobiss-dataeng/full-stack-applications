/**
 * Single source of truth for primary navigation — keeps Navbar, mobile menu, and footer in sync.
 */

export type NavItem = { href: string; label: string; spotlight?: boolean };

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV", spotlight: true },
  { href: "/method", label: "Approach" },
  { href: "/architecture", label: "Platform" },
  { href: "/data-pipeline", label: "Marts & pipelines" },
  { href: "/source-of-truth", label: "Metric truth" },
  { href: "/dashboard", label: "BI surface" },
];

export const homeDocLinks: readonly { href: string; label: string }[] = [
  { href: "/cv", label: "CV + why Analytics Eng" },
  { href: "/method", label: "Approach (trusted definitions)" },
  { href: "/ai-lab", label: "Self-service on governed metrics" },
  { href: "/architecture", label: "Platform & governance" },
  { href: "/data-pipeline", label: "dbt, tests, SQL → marts" },
  { href: "/source-of-truth", label: "Grain, lineage, API" },
] as const;

export const footerColumns: readonly { title: string; links: readonly { href: string; label: string }[] }[] = [
  {
    title: "Hire signal",
    links: [
      { href: "/cv", label: "CV & role fit" },
      { href: "/method", label: "Approach" },
    ],
  },
  {
    title: "Build the mart",
    links: [
      { href: "/data-pipeline", label: "Marts & pipelines" },
      { href: "/architecture", label: "Platform & explorer" },
    ],
  },
  {
    title: "Ship to analysts",
    links: [
      { href: "/ai-lab", label: "Self-service lab" },
      { href: "/source-of-truth", label: "Metric truth" },
      { href: "/dashboard", label: "BI surface" },
      { href: "/api/metrics", label: "Metrics API" },
    ],
  },
] as const;
