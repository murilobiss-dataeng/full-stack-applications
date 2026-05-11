import type { Metadata } from "next";
import { DashboardCharts } from "./DashboardCharts";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Analytics surface",
  description:
    "Governed analytics dashboards: cohorts, funnels, KPI bridges, platform health, and ops diagnostics from /api/metrics — same contract a BI workbook or embedded app would use.",
};

export default function DashboardPage() {
  return (
    <PageShell wide>
      <Reveal>
        <PageHeader
          kicker="Data visualization · governed BI"
          title="Analytics surface: metrics that stay true in the charts"
          description="This page is what you ship after curated marts and a published metrics API exist: cohort curves, funnel compression, segment mix, KPI bridges, plus platform signals (freshness, reliability, cost mix) — all bound to the same /api/metrics payload so grain and definitions never fork from the warehouse."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="New panels highlight freshness, pipeline success, credit mix, load health, and a trust radar — still 100% from the metrics route, ready to swap for warehouse-backed tiles." />
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
