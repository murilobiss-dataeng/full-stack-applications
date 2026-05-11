import type { Metadata } from "next";
import { redirect } from "next/navigation";

const SECTIONS = new Set(["platform", "governance", "explorer", "pipeline", "modeling"]);

export const metadata: Metadata = {
  title: "Marts & pipelines (redirect)",
  robots: { index: false, follow: true },
};

export default function DataPipelineRedirectPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const raw = searchParams.section;
  const s = typeof raw === "string" ? raw : undefined;
  const section = s && SECTIONS.has(s) ? s : "pipeline";
  redirect(`/infrastructure?section=${section}`);
}
