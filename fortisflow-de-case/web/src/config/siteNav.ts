/**
 * Single source of truth for primary navigation. Keeps Navbar, mobile menu, and footer in sync.
 */

export type NavItem = { href: string; label: string; spotlight?: boolean };

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/prep", label: "PM call prep", spotlight: true },
  { href: "/cv", label: "CV" },
  { href: "/data-pipeline", label: "Snowflake & ELT" },
  { href: "/data-modeling", label: "DW modeling" },
  { href: "/governance", label: "Quality & governance" },
  { href: "/dashboard", label: "Analytics surface" },
];

export const homeDocLinks: readonly { href: string; label: string }[] = [
  { href: "/prep", label: "Project Manager call · talking points" },
  { href: "/cv", label: "CV (PDF + on-page)" },
  { href: "/data-pipeline", label: "Snowflake optimization & pipelines" },
  { href: "/data-modeling", label: "Layers, grain, reusable SQL" },
  { href: "/governance", label: "Quality, lineage, access control" },
] as const;

export const footerColumns: readonly { title: string; links: readonly { href: string; label: string }[] }[] = [
  {
    title: "Interview",
    links: [
      { href: "/prep", label: "PM call prep" },
      { href: "/cv", label: "CV" },
      { href: "/data-pipeline", label: "Snowflake & ELT" },
    ],
  },
  {
    title: "Design & quality",
    links: [
      { href: "/data-modeling", label: "DW modeling" },
      { href: "/governance", label: "Quality & governance" },
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
