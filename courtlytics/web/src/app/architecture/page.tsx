import type { Metadata } from "next";
import { ArchitectureHubClient } from "./ArchitectureHubClient";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Architecture, governance & security, and repo explorer — system design, trust, and code layout in one place.",
};

export default function ArchitecturePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Platform"
          title="Architecture, governance & repository"
          description="Use the sections on the left: system design (flows, cloud ladder, tests), trust & operations (IAM, contracts, lineage, costs), then browse the monorepo tree without leaving this page."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <ArchitectureHubClient />
      </Reveal>
    </PageShell>
  );
}
