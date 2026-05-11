"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "@/components/ChartContainer";
import { Skeleton } from "@/components/ui/skeleton";
import type { MetricsPayload } from "@/types/metrics";

const axisStyle = { fill: "hsl(215, 20%, 65%)", fontSize: 11 };
const gridColor = "hsl(217, 33%, 16%)";
const tooltipStyle = {
  backgroundColor: "hsl(222, 47%, 10%)",
  border: "1px solid hsl(217, 33%, 22%)",
  borderRadius: "8px",
};

const PIE_COLORS = ["hsl(217, 91%, 55%)", "hsl(217, 33%, 48%)", "hsl(217, 91%, 38%)", "hsl(280, 45%, 52%)"];

export function DashboardCharts() {
  const [data, setData] = useState<MetricsPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/metrics")
      .then((r) => r.json())
      .then((body: MetricsPayload) => {
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
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[260px] rounded-xl" />
          <Skeleton className="h-[260px] rounded-xl" />
          <Skeleton className="h-[260px] rounded-xl md:col-span-2" />
          <Skeleton className="h-[260px] rounded-xl" />
          <Skeleton className="h-[260px] rounded-xl" />
        </div>
      </div>
    );
  }

  const lawyerChartData = data.lawyerPerformance.map((l) => ({
    name: l.name.replace("Resolved Entity ", "Entity "),
    cases: l.cases,
    winRatePct: Math.round(l.winRate * 100),
  }));

  const dqChartData = data.dqCheckResults.map((d) => ({
    name: d.name,
    pass: Number(d.passRate.toFixed(2)),
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "Rows processed", value: data.pipeline.rowsProcessed.toLocaleString() },
          { label: "Validation pass", value: `${(data.pipeline.validationPassRate * 100).toFixed(1)}%` },
          { label: "Clusters merged", value: data.entityResolution.clustersMerged.toLocaleString() },
          { label: "Avg match confidence", value: `${(data.entityResolution.avgConfidence * 100).toFixed(0)}%` },
          { label: "Last run (ms)", value: data.pipeline.lastRunDurationMs.toLocaleString() },
          { label: "Batch", value: data.batchId },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-gradient-to-br from-card/80 to-muted/20 px-4 py-3 transition-transform duration-300 motion-safe:hover:-translate-y-0.5"
          >
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1 truncate font-mono text-lg font-semibold tabular-nums tracking-tight text-foreground xl:text-xl">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
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
              <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, "Win rate"]} />
              <Bar dataKey="rate" fill="hsl(217, 91%, 50%)" radius={[6, 6, 0, 0]} name="Win rate" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Ingest volume (files / day)" description="Mock operational telemetry for landing zone.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.ingestVolumeDaily} margin={{ left: 0, right: 8, top: 8 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="files" fill="hsl(217, 33%, 44%)" radius={[4, 4, 0, 0]} name="Files" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Monthly throughput" description="Millions of rows processed (mock cumulative pipeline).">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.monthlyThroughput} margin={{ left: 0, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="thrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217, 91%, 45%)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(217, 91%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="millionRows" name="M rows" stroke="hsl(217, 91%, 58%)" fill="url(#thrFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="dbt-style check pass rates" description="Percent of checks passed last run (illustrative).">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dqChartData} layout="vertical" margin={{ left: 8, right: 24, top: 8 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis type="number" domain={[95, 100]} tick={axisStyle} axisLine={{ stroke: gridColor }} unit="%" />
              <YAxis type="category" dataKey="name" width={120} tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Pass rate"]} />
              <Bar dataKey="pass" fill="hsl(142, 55%, 42%)" radius={[0, 4, 4, 0]} name="Pass %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Cases by outcome" description="Distribution snapshot (synthetic).">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 8, bottom: 8 }}>
              <Pie
                data={data.casesByOutcome}
                dataKey="count"
                nameKey="outcome"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={2}
              >
                {data.casesByOutcome.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
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
                <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
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

        <div className="lg:col-span-2">
          <ChartContainer
            title="Entity resolution confidence"
            description="How many lawyer clusters landed in each confidence bucket (mock)."
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.resolutionConfidenceBuckets} margin={{ left: 4, right: 8, top: 8 }}>
                <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                <XAxis dataKey="bucket" tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill="hsl(217, 91%, 48%)" radius={[6, 6, 0, 0]} name="Clusters" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
