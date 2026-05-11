import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { PipelineContent } from "./PipelineContent";

export const metadata: Metadata = {
  title: "Snowflake & ELT",
  description:
    "FortisFlow demo: pipeline zones, incremental patterns, tests, data-quality gates, and reliability — framed for Snowflake performance, cost control, and secure multi-source integration.",
};

export default function DataPipelinePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Senior Data Engineer signal"
          title="Snowflake-centric pipelines & ELT"
          description="This hub mirrors what enterprise interviews probe: how you reduce scans and credits, keep warehouses right-sized, enforce RBAC and masking patterns, and run repeatable ELT with strong tests. The tabs below stay technology-agnostic (Python + SQL + dbt-style checks) so you can narrate the same story mapped to Snowflake tasks, streams, dynamic tables, or external tables."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <PipelineContent />
      </Reveal>
    </PageShell>
  );
}
