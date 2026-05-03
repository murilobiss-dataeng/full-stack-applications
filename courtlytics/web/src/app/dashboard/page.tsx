import type { Metadata } from "next";
import { DashboardCharts } from "./DashboardCharts";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Mock analytics: case duration, win rate by court, lawyer performance.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Analytics dashboard</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
        Charts hydrate from <code className="text-foreground">/api/metrics</code>, mimicking a mart served from the warehouse after dbt builds complete.
      </p>
      <div className="mt-10">
        <DashboardCharts />
      </div>
      <Card className="mt-10 border-dashed">
        <CardContent className="pt-6 text-sm text-muted-foreground">
          Data is synthetic for portfolio purposes. In production, row-level security and signed URLs would gate access to
          matter-level metrics.
        </CardContent>
      </Card>
    </div>
  );
}
