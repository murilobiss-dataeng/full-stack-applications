import type { Metadata } from "next";
import { TruthContent } from "./TruthContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Source of Truth",
  description: "Connected governance: deduplication, merge rules, and validation for a single view of legal entities.",
};

export default function SourceOfTruthPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Governance"
          title="Source of truth"
          description="Where feeds meet identity: contracts across layers, conflict resolution, and proof of quality before metrics ship — the connected half of a CSC-style stack."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <TruthContent />
      </Reveal>
    </PageShell>
  );
}
