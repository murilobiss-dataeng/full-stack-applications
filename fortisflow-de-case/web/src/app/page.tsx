import Link from "next/link";
import { Cpu, GitMerge, Layers, Shield, Sparkles, Wand2 } from "lucide-react";
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
              Murilo Biss · Senior Data Engineer · Snowflake · ELT · dbt · Quality
            </p>
            <h1 className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Snowflake-first data you can ship and defend
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Warehouses, tests, and contracts wired for production: one walkthrough for{" "}
              <strong className="text-foreground">Infrastructure</strong>, a governed{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">/api/metrics</code>, dashboards, and an{" "}
              <strong className="text-foreground">AI Lab</strong> that stays inside that contract.
            </p>
            <p className="mt-3 max-w-2xl rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> is a <em>fictional</em> regulated manufacturing /
              supply-chain scenario for this portfolio only — not a real client or employer program.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link href="/ai-lab" className={cn(buttonVariants(), "inline-flex h-9 gap-1.5 px-4 text-sm")}>
                <Wand2 className="h-3.5 w-3.5" />
                AI Lab
              </Link>
              <Link href="/infrastructure" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Infrastructure
              </Link>
              <Link href="/data-modeling" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                DW modeling
              </Link>
              <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Analytics surface
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
                  Credits, latency, and security as one thread: warehouse policy, pruning, RBAC, masking, and schedules that do not
                  leave idle burn.
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
                  Bronze / silver / gold, stable dimensions, incremental marts, and SQL with explicit grain so dashboards do not fork
                  definitions.
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
                  A versioned{" "}
                  <Link href="/api/metrics" className="text-primary underline-offset-4 hover:underline">
                    /api/metrics
                  </Link>{" "}
                  slice mirrors how you would hand off to BI tools or an LLM layer without a second source of truth.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="border-primary/20 bg-primary/[0.04]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-primary" aria-hidden />
                Regulated-industry posture
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed sm:text-sm">
                Quality gates, lineage, access control, and audit-friendly runs sit next to the technical tabs — the same bar you
                would hold on a manufacturing or security-adjacent program.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </Reveal>

      <Reveal delayMs={200} className="mt-8">
        <Link
          href="/ai-lab"
          className="group flex flex-col gap-1 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-white to-cyan-50/80 p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/15 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Featured
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">AI Lab — ask questions without breaking the metrics contract</p>
            <p className="mt-0.5 max-w-xl text-xs text-muted-foreground">
              Natural-language prompts resolve only to approved aggregates from <code className="text-foreground">/api/metrics</code>
              : the same pattern you would use for a governed assistant in front of Snowflake marts.
            </p>
          </div>
          <span className="mt-2 shrink-0 text-sm font-medium text-primary group-hover:underline sm:mt-0">
            Open AI Lab →
          </span>
        </Link>
      </Reveal>
    </PageShell>
  );
}
