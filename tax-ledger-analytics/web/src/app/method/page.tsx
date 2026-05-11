import type { Metadata } from "next";
import Link from "next/link";
import { Check, Database, GitMerge, Layers, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SITE_PRODUCT_NAME, DEMO_MARKETPLACE_BRAND } from "@/config/branding";

export const metadata: Metadata = {
  title: "Our approach",
  description:
    "Analytics Engineering delivery pattern — Clean, Structured, Connected — mapped to SQL, dbt, tests, and governed metrics (Murilo Biss).",
};

const pillars = [
  {
    letter: "C",
    title: "Clean",
    tag: "Trustworthy inputs",
    body: "Eliminate noise before reporting: unicode normalization, trimming, duplicate flags, and schema validation so provision models, compliance extracts, and planning scenarios are not poisoned by alias drift or malformed ERP/API batches.",
    repo: "`data-platform/src/processing/` and validation in `data-platform/src/pipeline/etl_pipeline.py`.",
    icon: Sparkles,
  },
  {
    letter: "S",
    title: "Structured",
    tag: "Analytics-ready shape",
    body: "Conformed dimensions, keys, and hierarchies so joins are predictable: counterparties, jurisdictions, transactions, and bridge tables with indexes aligned to dashboard filters — plus declarative transforms in dbt-style SQL.",
    repo: "`data-platform/src/database/models.py`, PostgreSQL DDL, and `data-platform/src/dbt/models/`.",
    icon: Layers,
  },
  {
    letter: "C",
    title: "Connected",
    tag: "Single view of identity",
    body: "Resolve the same counterparty across ERP, marketplace, and vendor feeds into one golden entity, then serve consistent metrics through an API so planning, tax, and BI tools read one story.",
    repo: "`data-platform/src/processing/entity_resolution.py`, `data-platform/data/curated/`, and `web/src/app/api/metrics`.",
    icon: GitMerge,
  },
] as const;

const mapRows = [
  { pillar: "Clean", href: "/data-pipeline?section=pipeline", label: "Pipeline, tests & DQ" },
  { pillar: "Structured", href: "/data-pipeline?section=modeling", label: "Modeling & SQL" },
  { pillar: "Connected", href: "/source-of-truth?section=truth", label: "Source of truth & API" },
  { pillar: "Trust", href: "/architecture?section=governance", label: "Governance & lineage" },
  { pillar: "CV", href: "/cv", label: "PDF + job-description mapping" },
  { pillar: "Explore", href: "/architecture?section=explorer", label: "Repo explorer" },
  { pillar: "End-to-end", href: "/architecture?section=platform", label: "Architecture & cloud ladder" },
];

export default function MethodPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Analytics Engineering"
          title="Clean, structured, connected data"
          description={`${SITE_PRODUCT_NAME} is Murilo Biss’s independent portfolio build, with a fictional ${DEMO_MARKETPLACE_BRAND} marketplace (DoorDash-class last-mile scale) as the narrative anchor for UK / multi-entity tax marts. It follows Clean, Structured, Connected (CSC) — to turn fragmented operational feeds into governed metrics and self-service. Below is how that pattern maps to this repository.`}
        />
      </Reveal>

      <Reveal delayMs={60} className="mt-8">
        <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
          <strong className="text-foreground">Why this pattern matters.</strong> Tax and finance stacks accumulate ERP
          lines, marketplace extracts, payroll feeds, and planning assumptions. Without a repeatable method, every new
          question spawns a one-off join while trust in headline numbers erodes. CSC-style delivery keeps ownership clear:
          clean once at the edge, structure for reuse in the warehouse, connect identities so reporting, compliance, and
          planning agree on the same counterparty grain.
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
            <CardTitle className="text-base">Pragmatic platform choices</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Favor <strong className="text-foreground">tests + contracts + dbt</strong> before buying shelfware. Open{" "}
              <Link href="/architecture?section=governance" className="text-primary underline-offset-4 hover:underline">
                Platform → Governance
              </Link>{" "}
              for IAM, contracts, and cost planning;{" "}
              <Link href="/architecture?section=platform" className="text-primary underline-offset-4 hover:underline">
                Platform → Architecture
              </Link>{" "}
              for cloud options (Snowflake, Databricks, Glue, …); try{" "}
              <Link href="/ai-lab" className="text-primary underline-offset-4 hover:underline">
                Self-service lab
              </Link>{" "}
              for analyst-style prompts over metrics; use{" "}
              <Link href="/data-pipeline?section=pipeline" className="text-primary underline-offset-4 hover:underline">
                Data → Pipeline
              </Link>{" "}
              for tests and quality gates between zones.
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
        <Link href="/architecture?section=explorer" className={cn(buttonVariants({ variant: "outline" }), "text-sm")}>
          Browse repo structure
        </Link>
      </Reveal>
    </PageShell>
  );
}
