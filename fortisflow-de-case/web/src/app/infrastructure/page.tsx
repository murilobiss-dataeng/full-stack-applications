import type { Metadata } from "next";
import { InfrastructureHubClient } from "./InfrastructureHubClient";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Repo hub · pipelines & modeling",
  description:
    "sigma-sec demo: monorepo explorer plus combined pipeline and modeling panels — Snowflake-oriented Data Engineering narrative.",
};

export default function InfrastructurePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Data Engineering · repo layout"
          title="Explorer, pipelines, and modeling in one hub"
          description="This combined view is for reviewers who want Git-style navigation next to the same pipeline and ER content you also expose on dedicated routes (/data-pipeline, /data-modeling). It highlights how you organize ELT code, tests, and marts before anything hits a dashboard or a semantic layer."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="Use /prep for interview alignment; use Snowflake & ELT and Quality pages for technical depth." />
      </Reveal>
      <Reveal delayMs={80}>
        <InfrastructureHubClient />
      </Reveal>
    </PageShell>
  );
}
