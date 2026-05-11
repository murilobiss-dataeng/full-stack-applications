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

const axisStyle = { fill: "hsl(220, 9%, 40%)", fontSize: 11 };
const gridColor = "hsl(0, 0%, 88%)";
const tooltipStyle = {
  backgroundColor: "hsl(0, 0%, 100%)",
  border: "1px solid hsl(0, 0%, 90%)",
  borderRadius: "8px",
  color: "hsl(222, 47%, 11%)",
};

const RED = "hsl(355, 92%, 56%)";
const RED_DARK = "hsl(355, 85%, 42%)";
const PIE_COLORS = [RED, "hsl(355, 70%, 48%)", "hsl(0, 0%, 55%)", "hsl(355, 55%, 72%)"];

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

  const partnerChartData = data.partnerPerformance.map((p) => ({
    name: p.name.replace("Merchant cluster ", "M"),
    orders: p.orders,
    onTimePct: Math.round(p.onTimeRate * 100),
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
          { label: "Merchant clusters merged", value: data.entityResolution.clustersMerged.toLocaleString() },
          { label: "Avg match confidence", value: `${(data.entityResolution.avgConfidence * 100).toFixed(0)}%` },
          { label: "Last run (ms)", value: data.pipeline.lastRunDurationMs.toLocaleString() },
          { label: "Batch", value: data.batchId },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-gradient-to-br from-white to-red-50/40 px-4 py-3 transition-transform duration-300 motion-safe:hover:-translate-y-0.5"
          >
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1 truncate font-mono text-lg font-semibold tabular-nums tracking-tight text-foreground xl:text-xl">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartContainer
          title="Fulfillment latency"
          description="Average hours from order to delivered — DoorRush UK mock mart."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.fulfillmentLatencyTrend} margin={{ left: 0, right: 8, top: 8 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="quarter" tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(222, 47%, 11%)" }} />
              <Line type="monotone" dataKey="avgHours" name="Avg hours" stroke={RED} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="On-time rate by hub" description="DoorRush city hubs — share of SLA-met deliveries (mock).">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data.onTimeRateByHub} margin={{ left: 0, right: 8, top: 8 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="hub" tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={axisStyle} axisLine={{ stroke: gridColor }} domain={[0.8, 1]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, "On-time"]} />
              <Bar dataKey="rate" fill={RED} radius={[6, 6, 0, 0]} name="On-time rate" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Ingest volume (files / day)" description="Landing zone telemetry (synthetic).">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.ingestVolumeDaily} margin={{ left: 0, right: 8, top: 8 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="files" fill={RED_DARK} radius={[4, 4, 0, 0]} name="Files" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Monthly throughput" description="Millions of rows processed (mock pipeline).">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.monthlyThroughput} margin={{ left: 0, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="thrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={RED} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={RED} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="millionRows" name="M rows" stroke={RED} fill="url(#thrFill)" strokeWidth={2} />
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
              <Bar dataKey="pass" fill="hsl(142, 55%, 38%)" radius={[0, 4, 4, 0]} name="Pass %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Orders by status" description="DoorRush marketplace snapshot (synthetic).">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 8, bottom: 8 }}>
              <Pie
                data={data.ordersByStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={2}
              >
                {data.ordersByStatus.map((_, i) => (
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
            title="Partner performance (golden merchants)"
            description="Order volume (bars) vs on-time % (line) after entity resolution."
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={partnerChartData} margin={{ left: 8, right: 12, top: 8 }}>
                <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <YAxis yAxisId="left" tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="orders" fill="hsl(355 92% 88%)" radius={[4, 4, 0, 0]} name="Orders" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="onTimePct"
                  stroke={RED}
                  strokeWidth={2}
                  name="On-time %"
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="lg:col-span-2">
          <ChartContainer
            title="Entity resolution confidence"
            description="Merchant / partner clusters by match confidence (mock)."
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.resolutionConfidenceBuckets} margin={{ left: 4, right: 8, top: 8 }}>
                <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                <XAxis dataKey="bucket" tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill={RED} radius={[6, 6, 0, 0]} name="Clusters" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
