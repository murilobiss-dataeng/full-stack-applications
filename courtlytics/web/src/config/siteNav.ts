/**
 * Single source of truth for primary navigation — keeps Navbar, mobile menu, and footer in sync.
 */

export type NavItem = { href: string; label: string; spotlight?: boolean };

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/method", label: "Method" },
  { href: "/ai-lab", label: "AI Lab", spotlight: true },
  { href: "/architecture", label: "Platform" },
  { href: "/data-pipeline", label: "Data" },
  { href: "/source-of-truth", label: "Truth & cases" },
  { href: "/dashboard", label: "Dashboard" },
];

export const homeDocLinks: readonly { href: string; label: string }[] = [
  { href: "/method", label: "Method (CSC)" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/architecture", label: "Platform (architecture + governance + explorer)" },
  { href: "/data-pipeline", label: "Data (pipeline + modeling)" },
  { href: "/source-of-truth", label: "Truth & cases (SOT + case study)" },
] as const;

export const footerColumns: readonly { title: string; links: readonly { href: string; label: string }[] }[] = [
  {
    title: "Strategy",
    links: [
      { href: "/method", label: "Method" },
      { href: "/architecture", label: "Platform" },
    ],
  },
  {
    title: "Data platform",
    links: [{ href: "/data-pipeline", label: "Pipeline & modeling" }],
  },
  {
    title: "Product",
    links: [
      { href: "/ai-lab", label: "AI Lab" },
      { href: "/source-of-truth", label: "Truth & cases" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/api/metrics", label: "API metrics" },
    ],
  },
] as const;
