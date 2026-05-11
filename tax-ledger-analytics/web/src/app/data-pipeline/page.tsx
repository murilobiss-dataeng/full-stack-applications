import type { Metadata } from "next";
import { DataHubClient } from "./DataHubClient";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Marts & pipelines",
  description:
    "Analytics Engineering core: zones, Python transforms, dbt-style SQL, tests, and modeling choices that make metrics reproducible before BI.",
};

export default function DataPipelinePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Analytics Engineering"
          title="From raw landing to trusted marts"
          description="This is where definitions harden: ingest contracts, transforms, data-quality gates, then relational design and dbt tests — the work that must be right before any dashboard earns trust."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <DataHubClient />
      </Reveal>
    </PageShell>
  );
}
