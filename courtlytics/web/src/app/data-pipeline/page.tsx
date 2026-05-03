import type { Metadata } from "next";
import { DataHubClient } from "./DataHubClient";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Data platform",
  description: "Pipeline and warehouse modeling — zones, ETL, tests, ER diagram, SQL examples, and Postgres performance.",
};

export default function DataPipelinePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Data platform"
          title="Pipeline & modeling"
          description="Everything that shapes data before the dashboard: ingest zones, how runs are tested, data-quality gates, then relational design, tooling choices, and example queries."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <DataHubClient />
      </Reveal>
    </PageShell>
  );
}
