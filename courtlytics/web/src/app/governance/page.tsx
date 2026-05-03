import type { Metadata } from "next";
import { GovernanceContent } from "./GovernanceContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Governance & security",
  description:
    "Security, IAM, data governance, contracts, lineage, data quality, observability, orchestration, performance, and TCO — executive-ready.",
};

export default function GovernancePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Trust & operations"
          title="Governance, security, and total cost of ownership"
          description="What separates a demo from production: who may access which data, how contracts and lineage prove quality, how you observe and orchestrate pipelines, and how you scale cost deliberately. Written for engineering and leadership alignment."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <GovernanceContent />
      </Reveal>
    </PageShell>
  );
}
