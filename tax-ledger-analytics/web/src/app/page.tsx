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
              Murilo Biss · Data Analyst · SQL · Excel / BI · Looker / Power BI · Python
            </p>
            <h1 className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              I turn business questions into clear metrics, charts, and checks people trust
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              <strong className="text-foreground">Data Analysts</strong> sit closest to the question: frame it with the right{" "}
              <strong className="text-foreground">grain</strong>, pull or validate the numbers in{" "}
              <strong className="text-foreground">SQL</strong>, stress-test with{" "}
              <strong className="text-foreground">simple rules and reconciliations</strong>, then ship{" "}
              <strong className="text-foreground">dashboards and narratives</strong> finance and ops can act on. This repo is
              a compact demo: curated API output, BI views, and the infrastructure context behind the tables — the same rhythm
              as working on a <strong className="text-foreground">tax or operations reporting pack</strong> when the mart is
              already owned elsewhere.
            </p>
            <p className="mt-3 max-w-2xl rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> is a{" "}
              <em>fictional</em> last-mile marketplace and logistics brand (red-and-white identity like major US delivery
              apps) used only in this portfolio: UK hubs, merchant partners, indirect tax inputs, and planning KPIs. No
              affiliation with any real company — the charts and data shapes are realistic; the brand is not.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link href="/cv" className={cn(buttonVariants(), "inline-flex h-9 gap-1.5 px-4 text-sm")}>
                <Download className="h-3.5 w-3.5" />
                CV &amp; role fit
              </Link>
              <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                BI surface
              </Link>
              <Link
                href="/infrastructure?section=pipeline"
                className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}
              >
                Infrastructure
              </Link>
              <Link href="/source-of-truth?section=visualization" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Metric truth
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
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                  Trusted inputs
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Sense-check freshness, nulls, and duplicates before you chart — the same hygiene a senior analyst documents
                  when signing off a recurring pack (definitions agreed with Finance, not invented in the workbook).
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-all duration-200 hover:border-[hsl(355,33%,85%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Layers className="h-4 w-4 text-primary" aria-hidden />
                  Modeled metrics
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  When tables and marts already exist, the job is to respect{" "}
                  <strong className="text-foreground">grain and business logic in SQL</strong> — slice with the right filters
                  so FP&amp;A, tax, and ops argue about decisions, not about which extract is “the real one”.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1 transition-all duration-200 hover:border-[hsl(355,33%,85%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <GitMerge className="h-4 w-4 text-primary" aria-hidden />
                  Analyst-ready
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  This demo exposes a small versioned{" "}
                  <Link href="/api/metrics" className="text-primary underline-offset-4 hover:underline">
                    /api/metrics
                  </Link>{" "}
                  contract — the same hand-off pattern you use before Looker, Power BI, or Sigma: one agreed slice for the
                  dashboard, not fifty ad-hoc queries.
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
            <p className="mt-1 text-sm font-medium text-foreground">Why hire me as a Data Analyst</p>
            <p className="mt-0.5 max-w-xl text-xs text-muted-foreground">
              CV + how I translate messy business asks into SQL, QA, and visuals stakeholders use — receipts, not buzzwords.
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
