import Link from "next/link";
import { ArrowRight, Database, GitBranch, Layers, Sparkles } from "lucide-react";
import { Section } from "@/components/Section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(217,91%,20%,0.35),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-20 sm:px-6 md:pt-28">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Legal Entity Resolution & Analytics</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Rebuilding a Legal Data Platform
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Court systems, vendors, and internal tools each emit overlapping snapshots of lawyers, judges, and cases.
            Courtlytics shows how to normalize that fragmentation into a governed warehouse with a single source of truth
            for identities.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/architecture" className={cn(buttonVariants(), "inline-flex gap-2")}>
              Explore architecture
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }))}>
              View dashboard
            </Link>
          </div>
        </div>
      </div>

      <Section
        id="problem"
        title="Problem"
        subtitle="Legal data is noisy, duplicated across dockets, and keyed inconsistently — blocking reliable analytics."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="h-4 w-4 text-primary" />
                Fragmented sources
              </CardTitle>
              <CardDescription>
                APIs, batch CSV drops, and legacy extracts disagree on spelling, order, and identifiers for the same
                person.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GitBranch className="h-4 w-4 text-primary" />
                Weak entity keys
              </CardTitle>
              <CardDescription>
                Without resolution, win rates, matter counts, and duration metrics fracture across alias rows.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Section>

      <Section
        id="solution"
        title="Solution"
        subtitle="A lakehouse-style pipeline: land raw in S3, harden in Python, model in Postgres, expose metrics through dbt-built views."
      >
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Lawyer Identity Resolution Engine</strong> — fuzzy clustering with
                  confidence scores merges &quot;John Smith&quot;, &quot;J. Smith&quot;, and &quot;Jonathan A Smith&quot; into one golden
                  entity.
                </span>
              </li>
              <li className="flex gap-3">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">PostgreSQL warehouse</strong> enforces roles, courts, and matter
                  relationships with indexes tuned for dashboard queries.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Section>

      <Section id="stack" title="Tech Stack" subtitle="Aligned with senior data engineering interviews: Python, AWS, SQL, dbt, and a modern serving layer.">
        <div className="flex flex-wrap gap-2">
          {["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn-style UI", "Recharts", "Python 3", "pytest", "PostgreSQL", "S3", "dbt"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-[hsl(217,33%,26%)] hover:text-foreground"
              >
                {t}
              </span>
            ),
          )}
        </div>
      </Section>

      <Section
        id="features"
        title="Key Features"
        subtitle="Everything in this repo is runnable: Python ETL with tests, curated JSON zones, and a Next.js experience layer."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Incremental loads",
              body: "Batch-scoped files from raw to curated with structured logs and validation gates.",
            },
            {
              title: "Data quality",
              body: "Schema checks in the pipeline; dbt tests documented for warehouse models.",
            },
            {
              title: "Serving API",
              body: "GET /api/metrics returns mock processed metrics for the dashboard.",
            },
          ].map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle className="text-base">{f.title}</CardTitle>
                <CardDescription>{f.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
