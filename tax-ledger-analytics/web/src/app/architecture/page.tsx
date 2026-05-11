import type { Metadata } from "next";
import { ArchitectureHubClient } from "./ArchitectureHubClient";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "How Analytics Engineering sits in the stack: architecture, governance, IAM, contracts, lineage, and repo layout — design choices that keep metrics trustworthy at scale.",
};

export default function ArchitecturePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Analytics Engineering in production"
          title="Architecture, governance & repository"
          description="Self-service only works if the platform underneath is boringly reliable: clear ownership, least-privilege access, contracts at zone boundaries, and cost-aware warehouse choices — all spelled out here so stakeholders see the same system the engineers run."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <ArchitectureHubClient />
      </Reveal>
    </PageShell>
  );
}
