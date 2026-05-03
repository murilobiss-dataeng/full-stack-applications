import type { Metadata } from "next";
import { ArchitectureContent } from "./ArchitectureContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Reference architecture: lake → Python → Postgres → dbt → API; startup cost tiers, pipeline testing, data quality options, and assistive AI.",
};

export default function ArchitecturePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="System"
          title="Architecture"
          description="Reference architecture with startup-friendly tiers: what to run on day one, what to add with revenue, and how testing, data quality, and assistive AI stay cheap until scale demands more."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <ArchitectureContent />
      </Reveal>
    </PageShell>
  );
}
