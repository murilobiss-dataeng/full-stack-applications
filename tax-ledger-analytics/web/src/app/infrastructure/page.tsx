import type { Metadata } from "next";
import { InfrastructureHubClient } from "./InfrastructureHubClient";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Marts & modeling",
  description:
    "Analytics Engineering lens: repository layout, mart pipelines, and relational modeling. Warehouse and platform operations are assumed in place; this hub shows how curated tables and contracts connect to BI.",
};

export default function InfrastructurePage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Analytics Engineering · curated layer"
          title="Marts, pipelines, and modeling"
          description="The heavy platform and governance work sits elsewhere in a real org. This hub is what you touch after tables land: how the repo is organized, how bronze-to-mart flows are tested, and how dimensions and facts are shaped for SQL, dbt, and the metrics API that powers Power BI, Tableau, Sigma, or a governed Next.js surface."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="Use Metric truth and the BI surface to show definitions and visuals; use this page for code layout and mart discipline only." />
      </Reveal>
      <Reveal delayMs={80}>
        <InfrastructureHubClient />
      </Reveal>
    </PageShell>
  );
}
