import type { Metadata } from "next";
import { InfrastructureHubClient } from "./InfrastructureHubClient";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Single place for platform architecture, governance, repository layout, data pipelines, marts, and modeling — context a Data Analyst uses when consuming curated tables and metric contracts before BI.",
};

export default function InfrastructurePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Data & platform context"
          title="Infrastructure — platform, marts & pipelines"
          description="Everything that sits under self-service analytics: architecture and cloud choices, security and contracts, how code is organized in the repo, then ingest zones through dbt tests and relational design. One surface so stakeholders and engineers see the same system — charts and narrative sit on top with Metric truth + BI surface."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="This route is the engineering scaffold; pair it with Metric truth and the BI surface to show the full value chain." />
      </Reveal>
      <Reveal delayMs={80}>
        <InfrastructureHubClient />
      </Reveal>
    </PageShell>
  );
}
