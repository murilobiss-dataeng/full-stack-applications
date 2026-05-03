"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "@/components/ChartContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { mockPipelineMetrics } from "@/lib/mockPipelineMetrics";

type Metrics = typeof mockPipelineMetrics;

const axisStyle = { fill: "hsl(215, 20%, 65%)", fontSize: 11 };
const gridColor = "hsl(217, 33%, 16%)";
const tooltipStyle = {
  backgroundColor: "hsl(222, 47%, 10%)",
  border: "1px solid hsl(217, 33%, 22%)",
  borderRadius: "8px",
};

export function DashboardCharts() {
  const [data, setData] = useState<Metrics | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/metrics")
      .then((r) => r.json())
      .then((body: Metrics) => {
        if (!cancelled) setData(body);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full lg:col-span-2" />
      </div>
    );
  }

  const lawyerChartData = data.lawyerPerformance.map((l) => ({
    name: l.name.replace("Resolved Entity ", "Entity "),
    cases: l.cases,
    winRatePct: Math.round(l.winRate * 100),
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartContainer title="Case duration trend" description="Average days to disposition by quarter (mock mart).">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.caseDurationTrend} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="quarter" tick={axisStyle} axisLine={{ stroke: gridColor }} />
            <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(210, 40%, 98%)" }} />
            <Line type="monotone" dataKey="avgDays" name="Avg days" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer title="Win rate by court" description="Plaintiff-favorable outcomes / adjudicated matters.">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.winRateByCourt} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="court" tick={axisStyle} axisLine={{ stroke: gridColor }} />
            <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={axisStyle} axisLine={{ stroke: gridColor }} domain={[0, 0.6]} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, "Win rate"]}
            />
            <Bar dataKey="rate" fill="hsl(217, 91%, 50%)" radius={[6, 6, 0, 0]} name="Win rate" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="lg:col-span-2">
        <ChartContainer
          title="Lawyer performance (golden entities)"
          description="Matter volume (bars) vs win rate % (line) after entity resolution."
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={lawyerChartData} margin={{ left: 8, right: 12, top: 8 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <YAxis yAxisId="left" tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(v) => `${v}%`}
                tick={axisStyle}
                axisLine={{ stroke: gridColor }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar yAxisId="left" dataKey="cases" fill="hsl(217, 33%, 42%)" radius={[4, 4, 0, 0]} name="Cases" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="winRatePct"
                stroke="hsl(217, 91%, 60%)"
                strokeWidth={2}
                name="Win rate %"
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
