import type { Metadata } from "next";
import { TruthHubClient } from "./TruthHubClient";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Source of truth",
  description:
    "Portfolio metric layer: grain, lineage, merge rules, and /api/metrics — patterns for trustworthy analytics without silent drift from the warehouse.",
};

export default function SourceOfTruthPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Structured stack · visualization proves value"
          title="Source of truth: definitions you can chart"
          description="This route shows how you lock grain, resolve entities, validate contracts, and publish a thin API before any BI or GenAI layer. The hire signal is the same as in delivery work: those guarantees become visuals and comparisons that executives trust, without ad-hoc SQL forks."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="This page wires lineage and contracts; pair it with the Analytics surface to show end-to-end trust." />
      </Reveal>
      <Reveal delayMs={80}>
        <TruthHubClient />
      </Reveal>
    </PageShell>
  );
}
