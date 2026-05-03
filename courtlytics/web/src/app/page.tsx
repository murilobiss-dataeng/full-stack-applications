import Link from "next/link";
import { ArrowRight, GitMerge, Layers, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { homeDocLinks } from "@/config/siteNav";

export default function HomePage() {
  return (
    <PageShell className="pb-16 pt-10 md:pb-20 md:pt-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 px-5 py-7 sm:px-7 sm:py-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(217,91%,24%,0.45),transparent)]" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Clean · structured · connected — matter & people intelligence
            </p>
            <h1 className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              From fragmented legal data to governed intelligence
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Courtlytics models a three-step pattern common in production legal-data programs — Clean, Structured,
              Connected (CSC): <strong className="text-foreground">clean</strong> inputs,{" "}
              <strong className="text-foreground">structure</strong> them for analytics, then{" "}
              <strong className="text-foreground">connect</strong> sources into one source of truth — demonstrated here with
              Python, Postgres, dbt, and a Next.js surface.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link href="/method" className={cn(buttonVariants(), "inline-flex h-9 gap-1.5 px-4 text-sm")}>
                Our method
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/ai-lab"
                className={cn(
                  buttonVariants(),
                  "inline-flex h-9 gap-1.5 border border-primary/40 bg-gradient-to-r from-primary to-violet-600 px-4 text-sm shadow-md shadow-primary/20 hover:opacity-95",
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI Lab
              </Link>
              <Link href="/architecture" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Platform
              </Link>
              <Link href="/data-pipeline" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Data
              </Link>
              <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4 text-sm")}>
                Dashboard
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
            <Card className="transition-all duration-200 hover:border-[hsl(217,33%,24%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Clean
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Normalize strings, flag duplicates, validate batches — reliable inputs before fuzzy work begins.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-all duration-200 hover:border-[hsl(217,33%,24%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Layers className="h-4 w-4 text-primary" />
                  Structured
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Relational warehouse + dbt-style marts so joins, tests, and dashboards share one schema contract.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1 transition-all duration-200 hover:border-[hsl(217,33%,24%)] hover:shadow-sm">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <GitMerge className="h-4 w-4 text-primary" />
                  Connected
                </CardTitle>
                <CardDescription className="text-sm leading-snug">
                  Entity resolution + <code className="text-foreground">resolved_entity_id</code> +{" "}
                  <Link href="/api/metrics" className="text-primary underline-offset-4 hover:underline">
                    /api/metrics
                  </Link>{" "}
                  — one story for people and matters across feeds.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={200} className="mt-8">
        <Link
          href="/ai-lab"
          className="group flex flex-col gap-1 rounded-2xl border border-primary/35 bg-gradient-to-br from-primary/15 via-card/80 to-violet-600/10 p-4 transition-all hover:border-primary/55 hover:shadow-lg hover:shadow-primary/10 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Featured
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">Simulated analyst over your metrics API</p>
            <p className="mt-0.5 max-w-xl text-xs text-muted-foreground">
              Natural-language prompt → live <code className="text-foreground">/api/metrics</code> → structured brief. No
              external model; shows how governed AI would feel.
            </p>
          </div>
          <span className="mt-2 shrink-0 text-sm font-medium text-primary group-hover:underline sm:mt-0">Open AI Lab →</span>
        </Link>
      </Reveal>
    </PageShell>
  );
}
