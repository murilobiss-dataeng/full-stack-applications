import type { Metadata } from "next";
import { DashboardCharts } from "./DashboardCharts";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Mock analytics: case duration, win rate by court, lawyer performance.",
};

export default function DashboardPage() {
  return (
    <PageShell wide>
      <Reveal>
        <PageHeader
          kicker="Analytics"
          title="Dashboard"
          description="Charts load from /api/metrics — mock mart data shaped like post-dbt rollups."
        />
      </Reveal>
      <Reveal delayMs={60}>
        <DashboardCharts />
      </Reveal>
      <Reveal delayMs={120}>
        <Card className="mt-6 border-dashed border-border/80 bg-muted/10">
          <CardContent className="py-4 text-xs text-muted-foreground sm:text-sm">
            Synthetic portfolio data. Production would add RLS, auth, and signed URLs for matter-level metrics.
          </CardContent>
        </Card>
      </Reveal>
    </PageShell>
  );
}
