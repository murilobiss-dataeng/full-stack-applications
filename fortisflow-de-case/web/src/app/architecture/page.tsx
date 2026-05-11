import type { Metadata } from "next";
import { redirect } from "next/navigation";

const SECTIONS = new Set(["explorer", "infrastructure", "performance", "quality", "modeling"]);

function normalizeLegacySection(id: string | undefined): string | undefined {
  if (id === "pipeline" || id === "governance") return "infrastructure";
  return id;
}

export const metadata: Metadata = {
  title: "Legacy route (redirect)",
  robots: { index: false, follow: true },
};

export default function ArchitectureRedirectPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const raw = searchParams.section;
  const s = typeof raw === "string" ? raw : undefined;
  const mapped = normalizeLegacySection(s);
  const section = mapped && SECTIONS.has(mapped) ? mapped : "explorer";
  redirect(`/infrastructure?section=${section}`);
}
