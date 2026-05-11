import Link from "next/link";
import { Cpu, GitMerge, Layers, Shield, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { homeDocLinks } from "@/config/siteNav";
import { DEMO_MARKETPLACE_BRAND } from "@/config/branding";

export default function HomePage() {
  return (
    <PageShell className="pb-16 pt-10 md:pb-20 md:pt-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 px-5 py-7 sm:px-7 sm:py-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(199,89%,48%,0.16),transparent)]" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Murilo Biss · Data Engineering · Snowflake · SQL · ELT · dbt · Quality · Cost &amp; performance
            </p>
            <h1 className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              I build dependable warehouses and pipelines analysts can run without babysitting the warehouse bill
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              This portfolio case is tuned for <strong className="text-foreground">Senior Data Engineer</strong> conversations
              where Snowflake is the spine: optimize credits and latency, model analytical layers with clear grain, wire
              multi-source ELT with tests, and keep <strong className="text-foreground">governance</strong> (RBAC, lineage,
              auditability) explicit — especially when the client operates under regulatory pressure.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              The demo keeps a compact <code className="rounded bg-muted px-1 py-0.5 text-foreground">/api/metrics</code>{" "}
              contract and charts so you can show how curated tables surface to consumers without one-off SQL sprawl.
            </p>
            <p className="mt-3 max-w-2xl rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> is a <em>fictional</em> regulated enterprise
              manufacturing and supply-chain analytics program used only in this site: compliance-heavy tone, international
              stakeholders, and Snowflake-first delivery patterns. No affiliation with any real manufacturer or Sigma Software
              client.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link href="/prep" className={cn(buttonVariants(), "inline-flex h-9 gap-1.5 px-4 text-sm")}>
                <Sparkles className="h-3.5 w-3.5" />
                PM call prep
              </Link>
              <Link href="/data-pipeline" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Snowflake &amp; ELT
              </Link>
              <Link href="/data-modeling" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                DW modeling
              </Link>
              <Link href="/governance" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Quality &amp; governance
              </Link>
            </div>
            <nav className="mt-5 flex flex-wrap gap-x-3 gap-y-2 border-t border-border/80 pt-4 text-sm text-muted-foreground">
              {homeDocLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-md px-1 py-0.5 transition-colors duration-200 hover:bg-muted/50 hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={70} className="mt-8 md:mt-10">
        <section aria-labelledby="overview-heading" className="space-y-3">
          <h2 id="overview-heading" className="sr-only">
            Overview
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all duration-200 hover:border-[hsl(199,33%,82%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Cpu className="h-4 w-4 text-primary" aria-hidden />
                  Snowflake optimization
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Performance, cost, and security as one narrative: pruning, warehouse policy, RBAC, masking patterns, and
                  pipeline schedules that do not burn idle credits.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-all duration-200 hover:border-[hsl(199,33%,82%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Layers className="h-4 w-4 text-primary" aria-hidden />
                  Layered DW &amp; reuse
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Bronze / silver / gold discipline, stable dimensions, incremental marts, and SQL that analysts can reuse
                  instead of re-deriving grain in every dashboard.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1 transition-all duration-200 hover:border-[hsl(199,33%,82%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <GitMerge className="h-4 w-4 text-primary" aria-hidden />
                  Contract-first hand-off
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  A small versioned{" "}
                  <Link href="/api/metrics" className="text-primary underline-offset-4 hover:underline">
                    /api/metrics
                  </Link>{" "}
                  boundary mirrors how you would expose curated slices to Sigma, Tableau, Power BI, or Lightdash without fifty
                  ad-hoc queries against raw.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="border-primary/20 bg-primary/[0.04]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-primary" aria-hidden />
                Regulated-industry posture (portfolio framing)
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed sm:text-sm">
                When the end client is industrial or security-adjacent, interviewers listen for{" "}
                <strong className="text-foreground">data quality</strong>, <strong className="text-foreground">audit trails</strong>
                , <strong className="text-foreground">lineage</strong>, <strong className="text-foreground">access control</strong>
                , and <strong className="text-foreground">reliability</strong> — not only pretty charts. This site keeps that lens
                visible next to the technical tabs.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </Reveal>

      <Reveal delayMs={200} className="mt-8">
        <Link
          href="/prep"
          className="group flex flex-col gap-1 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-white to-cyan-50/80 p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/15 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Featured
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">Why this case matches a Sigma Senior DE screen</p>
            <p className="mt-0.5 max-w-xl text-xs text-muted-foreground">
              Structured talking points for the PM hour: stack depth, ownership examples, and how you would run Snowflake under
              enterprise constraints.
            </p>
          </div>
          <span className="mt-2 shrink-0 text-sm font-medium text-primary group-hover:underline sm:mt-0">
            Open PM call prep →
          </span>
        </Link>
      </Reveal>
    </PageShell>
  );
}
