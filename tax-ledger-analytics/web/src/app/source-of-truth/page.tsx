import type { Metadata } from "next";
import { TruthHubClient } from "./TruthHubClient";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Metric truth",
  description:
    "Analytics Engineering: grain, lineage, merge rules, validation contracts, and the API boundary analysts should trust.",
};

export default function SourceOfTruthPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Analytics Engineering"
          title="Source of truth & narrative"
          description="Where metric definitions meet reality: lineage, deduplication, merge policy, validation, and the published API — plus a plain-language story for stakeholders who sign off on numbers."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <TruthHubClient />
      </Reveal>
    </PageShell>
  );
}
