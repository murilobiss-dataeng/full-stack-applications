/**
 * Single source of truth for primary navigation — keeps Navbar, mobile menu, and footer in sync.
 */

export type NavItem = { href: string; label: string; spotlight?: boolean };

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/method", label: "Method" },
  { href: "/ai-lab", label: "AI Lab", spotlight: true },
  { href: "/architecture", label: "Architecture" },
  { href: "/governance", label: "Governance" },
  { href: "/data-pipeline", label: "Pipeline" },
  { href: "/data-modeling", label: "Modeling" },
  { href: "/source-of-truth", label: "Source of truth" },
  { href: "/case-study", label: "Case study" },
  { href: "/explorer", label: "Explorer" },
  { href: "/dashboard", label: "Dashboard" },
];

export const homeDocLinks: readonly { href: string; label: string }[] = [
  { href: "/method", label: "Method (CSC)" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/architecture", label: "Architecture" },
  { href: "/governance", label: "Governance" },
  { href: "/data-pipeline", label: "Pipeline" },
  { href: "/data-modeling", label: "Modeling" },
  { href: "/source-of-truth", label: "Source of truth" },
  { href: "/case-study", label: "Case study" },
  { href: "/explorer", label: "Repo explorer" },
] as const;

export const footerColumns: readonly { title: string; links: readonly { href: string; label: string }[] }[] = [
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
      { href: "/ai-lab", label: "AI Lab" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/case-study", label: "Case study" },
      { href: "/explorer", label: "Repo explorer" },
      { href: "/api/metrics", label: "API metrics" },
    ],
  },
] as const;
