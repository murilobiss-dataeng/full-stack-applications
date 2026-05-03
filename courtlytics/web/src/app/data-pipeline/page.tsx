import type { Metadata } from "next";
import { PipelineContent } from "./PipelineContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Data Pipeline",
  description:
    "Zones, code, pipeline testing strategy, data quality between stages, and reliability — optimized for lean teams.",
};

export default function DataPipelinePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="ETL"
          title="Data pipeline"
          description="The clean pillar end-to-end: zone layout, code paths, how we test runs, data-quality gates between zones, and reliability patterns that stay cheap in early-stage environments."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <PipelineContent />
      </Reveal>
    </PageShell>
  );
}
