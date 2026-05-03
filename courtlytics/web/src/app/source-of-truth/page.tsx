import type { Metadata } from "next";
import { TruthContent } from "./TruthContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Source of Truth",
  description:
    "Journey simulation raw→API, dedup and merge policies, validation dimensions, and published API contracts for golden legal entities.",
};

export default function SourceOfTruthPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Governance"
          title="Source of truth"
          description="Lineage to curated API, merge matrix, quality dimensions, and how risks surface at each hop — the connected half of a CSC-style stack."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <TruthContent />
      </Reveal>
    </PageShell>
  );
}
