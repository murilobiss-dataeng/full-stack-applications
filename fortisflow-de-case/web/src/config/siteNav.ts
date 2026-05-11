/**
 * Single source of truth for primary navigation. Keeps Navbar, mobile menu, and footer in sync.
 */

export type NavItem = { href: string; label: string; spotlight?: boolean };

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/ai-lab", label: "AI Lab", spotlight: true },
  { href: "/cv", label: "CV" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/dashboard", label: "Analytics surface" },
];

export const homeDocLinks: readonly { href: string; label: string }[] = [
  { href: "/ai-lab", label: "AI Lab (governed metrics)" },
  { href: "/cv", label: "CV (PDF + on-page)" },
  { href: "/infrastructure", label: "Infrastructure (ELT · performance · DQ)" },
  { href: "/data-modeling", label: "DW modeling & SQL" },
  { href: "/source-of-truth", label: "Source of truth (contracts & lineage)" },
] as const;

export const footerColumns: readonly { title: string; links: readonly { href: string; label: string }[] }[] = [
  {
    title: "Profile",
    links: [
      { href: "/cv", label: "CV" },
      { href: "/ai-lab", label: "AI Lab" },
      { href: "/infrastructure", label: "Infrastructure" },
    ],
  },
  {
    title: "Design & trust",
    links: [
      { href: "/data-modeling", label: "DW modeling" },
      { href: "/source-of-truth", label: "Source of truth" },
    ],
  },
  {
    title: "Demo",
    links: [
      { href: "/dashboard", label: "Analytics surface" },
      { href: "/api/metrics", label: "Metrics API" },
    ],
  },
] as const;
