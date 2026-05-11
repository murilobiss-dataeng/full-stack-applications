import type { Metadata } from "next";
import { TruthHubClient } from "./TruthHubClient";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Metric truth",
  description:
    "Portfolio-ready metric layer: grain, lineage, merge rules, and /api/metrics — structured so data visualization and stakeholder narrative prove value on a fixed contract.",
};

export default function SourceOfTruthPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Structured stack · visualization proves value"
          title="Metric truth — definitions you can chart"
          description="This route mirrors the same pattern as Infrastructure: the heavy lifting (grain, dedup, validation, published API) is already sketched in code. Your hire signal is how those guarantees become clear visuals, comparisons, and exec-ready reads — without silent drift from the warehouse."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="This page wires lineage and contracts; pair it with the BI surface to show end-to-end trust." />
      </Reveal>
      <Reveal delayMs={80}>
        <TruthHubClient />
      </Reveal>
    </PageShell>
  );
}
