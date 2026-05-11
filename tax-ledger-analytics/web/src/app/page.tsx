import Link from "next/link";
import { Download, GitMerge, Layers, Sparkles } from "lucide-react";
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
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(355,92%,56%,0.18),transparent)]" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Murilo Biss · Analytics Engineering · SQL · dbt · Snowflake / Databricks · Looker / Power BI
            </p>
            <h1 className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              I turn raw finance &amp; operations data into metrics people trust
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              <strong className="text-foreground">Analytics Engineering</strong> is the discipline between Data Engineering
              and the business: translate questions into{" "}
              <strong className="text-foreground">grain and definitions</strong>, build{" "}
              <strong className="text-foreground">reusable SQL / dbt models</strong>, add{" "}
              <strong className="text-foreground">tests and lineage</strong>, then ship a{" "}
              <strong className="text-foreground">thin, governed surface</strong> — APIs or semantic layers — so Sigma,
              Looker, or planning tools consume <strong className="text-foreground">one version of the truth</strong>. This
              repo is a compact proof: bronze→gold flow, mart rollups, contract-tested outputs, and a BI-style front end —
              the same muscle memory as expanding a <strong className="text-foreground">tax or finance data mart</strong>{" "}
              with self-service guardrails.
            </p>
            <p className="mt-3 max-w-2xl rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> is a{" "}
              <em>fictional</em> last-mile marketplace and logistics brand (red-and-white identity like major US delivery
              apps) used only in this portfolio: UK hubs, merchant partners, indirect tax inputs, and planning KPIs. No
              affiliation with any real company — the stack patterns are production-grade.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link href="/cv" className={cn(buttonVariants(), "inline-flex h-9 gap-1.5 px-4 text-sm")}>
                <Download className="h-3.5 w-3.5" />
                CV &amp; role fit
              </Link>
              <Link
                href="/method"
                className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}
              >
                Approach
              </Link>
              <Link href="/infrastructure?section=pipeline" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Infrastructure
              </Link>
              <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                BI surface
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
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="sr-only">
            Overview
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all duration-200 hover:border-[hsl(355,33%,85%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Trusted inputs
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Validation and normalization at the edge of the warehouse — so every downstream metric starts from the
                  same assumptions an Analytics Engineer would document in a metric spec (freshness, null rules, dup
                  handling).
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-all duration-200 hover:border-[hsl(355,33%,85%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Layers className="h-4 w-4 text-primary" />
                  Modeled metrics
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Dimensions, facts, and dbt-style marts encode{" "}
                  <strong className="text-foreground">grain and business logic in SQL</strong> — not in fifty desktop
                  extracts — so FP&amp;A, tax, and ops argue about decisions, not definitions.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1 transition-all duration-200 hover:border-[hsl(355,33%,85%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <GitMerge className="h-4 w-4 text-primary" />
                  Analyst-ready
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Golden keys and a versioned{" "}
                  <Link href="/api/metrics" className="text-primary underline-offset-4 hover:underline">
                    /api/metrics
                  </Link>{" "}
                  contract — the hand-off Analytics Engineers own before Looker, Sigma, or notebooks touch production
                  aggregates.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={200} className="mt-8">
        <Link
          href="/cv"
          className="group flex flex-col gap-1 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-white to-red-50/80 p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/15 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Featured
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">Why hire me as Analytics Engineering</p>
            <p className="mt-0.5 max-w-xl text-xs text-muted-foreground">
              CV + concrete mapping from the role (semantic marts, dbt, SQL at scale, BI, partner teams) to how I have
              already shipped — not buzzwords, receipts.
            </p>
          </div>
          <span className="mt-2 shrink-0 text-sm font-medium text-primary group-hover:underline sm:mt-0">
            Open CV &amp; role fit →
          </span>
        </Link>
      </Reveal>
    </PageShell>
  );
}
