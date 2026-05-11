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
    "Data visualization on a fixed contract: charts bound to /api/metrics — the proof surface that turns Metric truth and Infrastructure into decisions stakeholders see.",
};

export default function DashboardPage() {
  return (
    <PageShell wide>
      <Reveal>
        <PageHeader
          kicker="Data visualization · value on a governed contract"
          title="BI surface — charts that inherit the mart"
          description="The warehouse and API layers are already modeled in this portfolio. This page is where you show impact: readable trends, comparisons, and guardrails — the same numbers a Looker explore or Sigma workbook would consume, without one-off SQL."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="This is the fastest place to prove DV craft: every series comes from the published metrics route, not mock spreadsheets." />
      </Reveal>
      <Reveal delayMs={60}>
        <DashboardCharts />
      </Reveal>
      <Reveal delayMs={120}>
        <Card className="mt-6 border-dashed border-border/80 bg-muted/10">
          <CardContent className="py-4 text-xs text-muted-foreground sm:text-sm">
            Synthetic data. In production, Analytics Engineering adds RLS, metric ownership, change logs, and SLAs so
            self-service never silently diverges from the warehouse.
          </CardContent>
        </Card>
      </Reveal>
    </PageShell>
  );
}
