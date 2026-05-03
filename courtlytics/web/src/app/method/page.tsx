import type { Metadata } from "next";
import Link from "next/link";
import { Check, Database, GitMerge, Layers, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our method",
  description:
    "Clean, Structured, Connected — how Courtlytics maps industry legal-data methodology to an open portfolio stack.",
};

const pillars = [
  {
    letter: "C",
    title: "Clean",
    tag: "Trustworthy inputs",
    body: "Eliminate noise before analytics: unicode normalization, trimming, deduplication signals, and schema validation so downstream metrics are not poisoned by alias drift or malformed batches.",
    repo: "`data-platform/src/processing/` and validation in `data-platform/src/pipeline/etl_pipeline.py`.",
    icon: Sparkles,
  },
  {
    letter: "S",
    title: "Structured",
    tag: "Analytics-ready shape",
    body: "Conformed dimensions, keys, and hierarchies so joins are predictable: lawyers, courts, cases, and bridge tables with indexes aligned to dashboard filters — plus declarative transforms in dbt-style SQL.",
    repo: "`data-platform/src/database/models.py`, PostgreSQL DDL, and `data-platform/src/dbt/models/`.",
    icon: Layers,
  },
  {
    letter: "C",
    title: "Connected",
    tag: "Single view of identity",
    body: "Resolve the same person across vendors and dockets into one golden entity, then serve consistent metrics through an API so CRM-style surfaces and BI tools read one story.",
    repo: "`data-platform/src/processing/entity_resolution.py`, `data-platform/data/curated/`, and `web/src/app/api/metrics`.",
    icon: GitMerge,
  },
] as const;

const mapRows = [
  { pillar: "Clean", href: "/data-pipeline", label: "Pipeline, tests & DQ gates" },
  { pillar: "Structured", href: "/data-modeling", label: "Warehouse & dbt" },
  { pillar: "Connected", href: "/source-of-truth", label: "Source of truth & APIs" },
  { pillar: "Trust", href: "/governance", label: "Security, lineage & TCO" },
  { pillar: "End-to-end", href: "/architecture", label: "Tiers, cloud ladder & AI" },
];

export default function MethodPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Methodology"
          title="Clean, structured, connected data"
          description="Courtlytics is a portfolio build, but its design follows the same three-tenet pattern used in mature legal data programs — including the Clean, Structured, & Connected (CSC) framing popularized by Courtroom Insight for turning fragmented legal data into actionable intelligence. Here is how those ideas map to this repository (no affiliation; educational reference only)."
        />
      </Reveal>

      <Reveal delayMs={60} className="mt-8">
        <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
          <strong className="text-foreground">Why this pattern matters.</strong> Legal stacks accumulate overlapping feeds
          (dockets, directories, internal CRM). Without a repeatable method, integrations multiply while trust in metrics
          falls. CSC-style delivery keeps ownership clear: clean once, structure for reuse, connect for a single source of
          truth.
        </div>
      </Reveal>

      <Reveal delayMs={100} className="mt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="relative overflow-hidden transition-all duration-200 hover:border-[hsl(217,33%,26%)]">
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 font-mono text-xs font-bold text-primary">
                {p.letter}
              </div>
              <CardHeader className="pr-12 pt-5">
                <CardTitle className="flex items-center gap-2 text-base">
                  <p.icon className="h-4 w-4 text-primary" aria-hidden />
                  {p.title}
                </CardTitle>
                <CardDescription className="text-xs font-medium uppercase tracking-wide text-primary/90">
                  {p.tag}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>{p.body}</p>
                <p className="border-t border-border/60 pt-3 text-xs">
                  <span className="font-medium text-foreground">In this repo: </span>
                  {p.repo}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal delayMs={140} className="mt-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Data engineering on a startup budget</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Favor <strong className="text-foreground">tests + contracts + dbt</strong> before buying platforms. See{" "}
              <Link href="/governance" className="text-primary underline-offset-4 hover:underline">
                Governance
              </Link>{" "}
              for IAM, ownership, lineage, and COO-level cost bands; see{" "}
              <Link href="/architecture" className="text-primary underline-offset-4 hover:underline">
                Architecture
              </Link>{" "}
              for cloud options (Glue, Databricks, …) and AI; see{" "}
              <Link href="/data-pipeline" className="text-primary underline-offset-4 hover:underline">
                Data pipeline
              </Link>{" "}
              for how runs are tested and how quality gates sit between zones.
            </CardDescription>
          </CardHeader>
        </Card>
      </Reveal>

      <Reveal delayMs={160} className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Navigate the build</h2>
        <ul className="mt-4 divide-y divide-border/80 rounded-xl border border-border bg-card/40">
          {mapRows.map((row) => (
            <li key={row.href}>
              <Link
                href={row.href}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted/40 sm:px-5"
              >
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="font-medium text-foreground">{row.pillar}</span>
                  <span className="text-muted-foreground">— {row.label}</span>
                </span>
                <span className="text-xs text-primary">View</span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delayMs={200} className="mt-10 flex flex-wrap gap-2">
        <Link href="/dashboard" className={cn(buttonVariants(), "text-sm")}>
          <Database className="mr-1.5 h-4 w-4" />
          See metrics dashboard
        </Link>
        <Link href="/explorer" className={cn(buttonVariants({ variant: "outline" }), "text-sm")}>
          Browse repo structure
        </Link>
      </Reveal>
    </PageShell>
  );
}
