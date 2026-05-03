import type { Metadata } from "next";
import { TruthHubClient } from "./TruthHubClient";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Truth & cases",
  description:
    "Source-of-truth mechanics and a readable case study — lineage, merges, validation, API contracts, plus plain-English scaling.",
};

export default function SourceOfTruthPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Quality"
          title="Source of truth & case study"
          description="Technical governance of golden entities, simulated path to the API, and a separate narrative for stakeholders who are not data engineers."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <TruthHubClient />
      </Reveal>
    </PageShell>
  );
}
