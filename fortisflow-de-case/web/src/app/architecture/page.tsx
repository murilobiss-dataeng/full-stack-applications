import type { Metadata } from "next";
import { redirect } from "next/navigation";

const SECTIONS = new Set(["explorer", "pipeline", "modeling"]);

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
  const section = s && SECTIONS.has(s) ? s : "explorer";
  redirect(`/infrastructure?section=${section}`);
}
