"use client";

import { useEffect, useMemo, useState } from "react";
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
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
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
const RED_SOFT = "hsl(355, 70%, 48%)";
const PIE_COLORS = [RED, RED_SOFT, "hsl(0, 0%, 55%)", "hsl(355, 55%, 72%)"];

const COHORT_LINE_COLORS = ["hsl(355, 85%, 42%)", "hsl(355, 72%, 48%)", "hsl(217, 70%, 48%)", "hsl(142, 45%, 38%)"];

const BRIDGE_POS = "hsl(142, 48%, 40%)";
const BRIDGE_NEG = "hsl(355, 65%, 48%)";

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

  const partnerChartData = useMemo(() => {
    if (!data) return [];
    return data.partnerPerformance.map((p) => ({
      name: p.name.replace("Merchant cluster ", "M"),
      orders: p.orders,
      onTimePct: Math.round(p.onTimeRate * 100),
    }));
  }, [data]);

  const scatterQuality = useMemo(() => {
    if (!data) return [];
    return data.partnerPerformance.map((p) => ({
      name: p.name.replace("Merchant cluster ", "M"),
      prepMin: p.prepMins,
      onTimePct: Math.round(p.onTimeRate * 100),
      z: Math.sqrt(p.orders) / 80,
    }));
  }, [data]);

  if (!data) {
    return (
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[280px] rounded-xl" />
          <Skeleton className="h-[280px] rounded-xl" />
          <Skeleton className="h-[280px] rounded-xl md:col-span-2" />
          <Skeleton className="h-[280px] rounded-xl" />
          <Skeleton className="h-[280px] rounded-xl" />
        </div>
      </div>
    );
  }

  const dqChartData = data.dqCheckResults.map((d) => ({
    name: d.name,
    pass: Number(d.passRate.toFixed(2)),
  }));

  const cohort = data.cohortMerchantRetentionPct ?? [];
  const funnel = data.fulfillmentFunnel ?? [];
  const segmentMix = data.segmentGmvMixPct ?? [];
  const bridge = data.kpiBridgeIndex ?? [];

  return (
    <div className="space-y-10">
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

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Cohorts, funnels, and mix</h2>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Same slices you would ship in Power BI, Tableau, or Sigma: retention by signup cohort, operational funnel compression, GMV
            mix by segment, and a simple KPI bridge. All series bind to the published metrics contract.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {cohort.length > 0 ? (
            <ChartContainer
              className="lg:col-span-2"
              chartClassName="h-[280px] sm:h-[300px]"
              title="Merchant activity retention by signup cohort"
              description="Percent of merchants with ≥1 order in week N after cohort month (illustrative mart grain)."
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohort} margin={{ left: 4, right: 16, top: 8 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                  <XAxis dataKey="relWeek" tick={axisStyle} axisLine={{ stroke: gridColor }} />
                  <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 105]} tick={axisStyle} axisLine={{ stroke: gridColor }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="m09" name="Sep cohort" stroke={COHORT_LINE_COLORS[0]} strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="m10" name="Oct cohort" stroke={COHORT_LINE_COLORS[1]} strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="m11" name="Nov cohort" stroke={COHORT_LINE_COLORS[2]} strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="m12" name="Dec cohort" stroke={COHORT_LINE_COLORS[3]} strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : null}

          {funnel.length > 0 ? (
            <ChartContainer
              title="Fulfillment funnel (counts)"
              description="Compression from placement to delivered; use for SLA staffing and leakage alerts."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnel} layout="vertical" margin={{ left: 8, right: 16, top: 8 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                  <XAxis type="number" tick={axisStyle} axisLine={{ stroke: gridColor }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="step" width={108} tick={axisStyle} axisLine={{ stroke: gridColor }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v.toLocaleString(), "Orders"]} />
                  <Bar dataKey="count" fill={RED_DARK} radius={[0, 6, 6, 0]} name="Volume" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : null}

          {segmentMix.length > 0 ? (
            <ChartContainer
              title="GMV mix by customer segment"
              description="100% stacked bars: SMB vs mid-market vs enterprise (mock finance / tax segmentation)."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={segmentMix} margin={{ left: 0, right: 8, top: 8 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={axisStyle} axisLine={{ stroke: gridColor }} />
                  <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} tick={axisStyle} axisLine={{ stroke: gridColor }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="smb" stackId="mix" fill="hsl(355, 85%, 52%)" name="SMB" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="midMarket" stackId="mix" fill="hsl(217, 55%, 52%)" name="Mid-market" />
                  <Bar dataKey="enterprise" stackId="mix" fill="hsl(142, 40%, 42%)" name="Enterprise" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : null}

          {bridge.length > 0 ? (
            <ChartContainer
              className="lg:col-span-2"
              title="KPI bridge (indexed)"
              description="Illustrative decomposition: volume and basket lift vs promo drag, same narrative as finance flash."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bridge} margin={{ left: 4, right: 8, top: 8 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={axisStyle} axisLine={{ stroke: gridColor }} interval={0} angle={-12} textAnchor="end" height={56} />
                  <YAxis tick={axisStyle} axisLine={{ stroke: gridColor }} domain={[90, "auto"]} tickFormatter={(v) => `${v}`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v, "Index"]} />
                  <ReferenceLine y={100} stroke="hsl(220, 9%, 70%)" strokeDasharray="4 4" />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} name="Index">
                    {bridge.map((row, i) => {
                      const prev = bridge[i - 1]?.value ?? row.value;
                      const up = row.value >= prev || i === 0;
                      const isOutcome = i === bridge.length - 1;
                      const fill = i === 0 || isOutcome ? "hsl(220, 14%, 46%)" : up ? BRIDGE_POS : BRIDGE_NEG;
                      return <Cell key={row.label} fill={fill} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Operations, hubs, and quality</h2>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Time series, geo hubs, ingest cadence, and entity-resolution health: the layer analysts watch during close or
            marketplace peaks.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartContainer
            title="Fulfillment latency"
            description="Average hours from order to delivered, DoorRush UK mock mart."
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

          <ChartContainer title="On-time rate by hub" description="City hubs with internal 93% SLA reference (mock).">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.onTimeRateByHub} margin={{ left: 0, right: 8, top: 8 }}>
                <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                <XAxis dataKey="hub" tick={axisStyle} axisLine={{ stroke: gridColor }} />
                <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={axisStyle} axisLine={{ stroke: gridColor }} domain={[0.8, 1]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, "On-time"]} />
                <ReferenceLine y={0.93} stroke="hsl(220, 9%, 65%)" strokeDasharray="5 5" label={{ value: "SLA 93%", fill: axisStyle.fill, fontSize: 10 }} />
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

          {scatterQuality.length > 0 ? (
            <ChartContainer
              title="Prep time vs on-time (bubble ~ order volume)"
              description="Scatter for ops analytics: where speed trades off against SLA (golden clusters)."
            >
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ left: 8, right: 12, top: 8 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="prepMin" name="Prep min" tick={axisStyle} axisLine={{ stroke: gridColor }} label={{ value: "Avg prep (min)", position: "bottom", offset: 0, fill: axisStyle.fill, fontSize: 10 }} />
                  <YAxis type="number" dataKey="onTimePct" name="On-time %" tick={axisStyle} axisLine={{ stroke: gridColor }} domain={[85, 100]} tickFormatter={(v) => `${v}%`} />
                  <ZAxis type="number" dataKey="z" range={[80, 320]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={tooltipStyle} />
                  <Scatter name="Partners" data={scatterQuality} fill={RED} />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : null}

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
      </section>
    </div>
  );
}
