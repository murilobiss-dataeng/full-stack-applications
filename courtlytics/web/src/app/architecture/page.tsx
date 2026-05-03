import type { Metadata } from "next";
import { ArchitectureContent } from "./ArchitectureContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Lake → Python → Postgres → dbt → API; startup tiers, cloud ladder (Glue, EMR, Databricks, Snowflake), testing, DQ, AI, and governance links.",
};

export default function ArchitecturePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="System"
          title="Architecture"
          description="Reference flows, startup tiers, a cloud cost ladder (Glue, EMR, Databricks, Snowflake, …), testing and DQ, assistive AI, and links to governance for IAM and contracts."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <ArchitectureContent />
      </Reveal>
    </PageShell>
  );
}
