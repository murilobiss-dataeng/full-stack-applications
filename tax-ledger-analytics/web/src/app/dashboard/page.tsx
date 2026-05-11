import type { Metadata } from "next";
import { DashboardCharts } from "./DashboardCharts";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "BI surface",
  description:
    "Analytics-style dashboards on a fixed contract: cohort retention, funnels, segment mix, KPI bridges, and ops diagnostics from /api/metrics, aligned with Snowflake marts and governed semantics.",
};

export default function DashboardPage() {
  return (
    <PageShell wide>
      <Reveal>
        <PageHeader
          kicker="Data visualization · analytics-grade BI"
          title="BI surface: cohorts, funnels, and governed metrics"
          description="This page mirrors what you ship after Snowflake marts and semantic contracts exist: retention curves, funnel compression, segment mix, bridges, and ops diagnostics. Every series is bound to the same /api/metrics payload a Power BI dataset or Sigma workbook would call, so grain and definitions stay aligned with Analytics Engineering."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="Cohort, funnel, and bridge panels are intentionally richer than a single KPI strip: they show how you think about self-service analytics, not only chart styling." />
      </Reveal>
      <Reveal delayMs={60}>
        <DashboardCharts />
      </Reveal>
      <Reveal delayMs={120}>
        <Card className="mt-6 border-dashed border-border/80 bg-muted/10">
          <CardContent className="py-4 text-xs text-muted-foreground sm:text-sm">
            Synthetic data. In production, data teams add RLS, metric ownership, change logs, and SLAs so dashboards never
            silently diverge from the warehouse.
          </CardContent>
        </Card>
      </Reveal>
    </PageShell>
  );
}
