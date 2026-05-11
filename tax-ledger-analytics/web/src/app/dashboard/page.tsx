import type { Metadata } from "next";
import { DashboardCharts } from "./DashboardCharts";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "BI surface",
  description:
    "Analytics Engineering demo: charts bound to a versioned /api/metrics contract — how Looker or Sigma would consume curated mart outputs.",
};

export default function DashboardPage() {
  return (
    <PageShell wide>
      <Reveal>
        <PageHeader
          kicker="Analytics Engineering"
          title="BI surface on a governed metrics contract"
          description="Every chart reads from /api/metrics — the same pattern as exposing a semantic layer or curated explores: analysts never query raw landing tables; they inherit grain, filters, and definitions from the mart."
        />
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
