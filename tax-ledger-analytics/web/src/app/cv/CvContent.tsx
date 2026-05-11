import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Database,
  Download,
  FileText,
  GitBranch,
  Layers,
  LineChart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEMO_MARKETPLACE_BRAND } from "@/config/branding";

const CV_PDF_HREF = "/cv-murilo-biss.pdf";

const kpis = [
  { value: "7+", label: "Years in data", hint: "SQL → marts → BI" },
  { value: "dbt", label: "Production", hint: "Snowflake · Databricks" },
  { value: "BI", label: "Looker · PBI", hint: "Semantic hand-off" },
  { value: "∞", label: "Grain first", hint: "Tests · lineage" },
] as const;

const stackChips = ["Python", "Spark", "Airflow", "AWS", "Azure", "Terraform", "Agile / global"] as const;

const jdItems = [
  {
    Icon: Target,
    title: "Governed marts & self-service",
    bullets: [
      "Workshops on grain + naming before BI touches SQL",
      "Tarmac.IO · AB InBev · Banco Bari — definitions I owned",
      "Looker / Power BI on top of models I controlled",
    ],
  },
  {
    Icon: GitBranch,
    title: "dbt-style rigor",
    bullets: [
      "Medallion + factory patterns at enterprise scale",
      "Singular + relationship tests like a real release gate",
      "This repo = living sketch of how I gate marts",
    ],
  },
  {
    Icon: BarChart3,
    title: "Metrics catalog mindset",
    bullets: [
      "/api/metrics + dashboards = semantic boundary demo",
      "Versionable contracts, not one-off spreadsheets",
      "Safe for analysts — no raw-table roulette",
    ],
  },
  {
    Icon: Zap,
    title: "Scale & ownership",
    bullets: [
      "7+ yrs · Spark/PySpark · Airflow certified",
      "Senior analyst roots → engineer depth",
      "SLAs + backlog language without losing grain",
    ],
  },
  {
    Icon: Layers,
    title: "Cross-team delivery",
    bullets: [
      "Product & engineering at Tarmac",
      "Multi-market KPI alignment at AB InBev",
      "Terraform / CI where it moves the needle",
    ],
  },
] as const;

const roles = [
  {
    org: "Tarmac.IO",
    role: "Senior Data Engineer",
    period: "2025 — present",
    accent: "from-primary/20 to-transparent",
    tags: ["dbt", "Snowflake", "DLT", "Terraform"],
  },
  {
    org: "AB InBev",
    role: "Data Engineer",
    period: "2023 — 2025",
    accent: "from-red-100/80 to-transparent",
    tags: ["Databricks", "Factory ETL", "Global KPIs"],
  },
  {
    org: "Banco Bari",
    role: "Data Engineer / Sr. Data Analyst",
    period: "2019 — 2023",
    accent: "from-primary/15 to-transparent",
    tags: ["AWS", "Airflow", "SQL", "Dashboards"],
  },
] as const;

export function CvContent() {
  return (
    <div className="space-y-10 px-1 sm:px-0">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-white via-red-50/40 to-white px-6 py-8 shadow-lg shadow-primary/10 sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/5 blur-2xl" aria-hidden />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Analytics Engineering
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Murilo Biss</h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              From messy ops data to{" "}
              <span className="font-semibold text-foreground">metrics that survive scrutiny</span> — SQL, dbt, warehouses,
              and BI surfaces people actually use.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={CV_PDF_HREF} download className={cn(buttonVariants(), "gap-2 shadow-md shadow-primary/20")}>
                <Download className="h-4 w-4" aria-hidden />
                CV (PDF)
              </a>
              <a
                href={CV_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2 border-primary/30 bg-white/80")}
              >
                <FileText className="h-4 w-4" aria-hidden />
                Open PDF
              </a>
              <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "gap-2 bg-white/80")}>
                <LineChart className="h-4 w-4" aria-hidden />
                Live metrics
              </Link>
              <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "gap-1")}>
                Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid w-full max-w-md shrink-0 grid-cols-2 gap-3 sm:grid-cols-2">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-border/80 bg-white/90 px-4 py-4 text-center shadow-sm backdrop-blur-sm transition hover:border-primary/35 hover:shadow-md"
              >
                <p className="font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">{k.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-foreground">{k.label}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{k.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section aria-label="Contact" className="flex flex-wrap gap-2 sm:gap-3">
        <a
          href="mailto:murilobiss@gmail.com"
          className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm shadow-sm transition hover:border-primary/40 hover:shadow-md"
        >
          <Mail className="h-4 w-4 text-primary" aria-hidden />
          <span className="font-medium text-foreground">murilobiss@gmail.com</span>
        </a>
        <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm shadow-sm">
          <Phone className="h-4 w-4 text-primary" aria-hidden />
          +55 (41) 99835-8844
        </span>
        <a
          href="https://www.linkedin.com/in/murilobiss"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm shadow-sm transition hover:border-primary/40 hover:shadow-md"
        >
          <Linkedin className="h-4 w-4 text-primary" aria-hidden />
          LinkedIn
        </a>
        <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          Brazil · EN / PT
        </span>
      </section>

      {/* Value prop — bento */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden />
            <h2 className="text-sm font-bold uppercase tracking-wide">Why hire (AE lens)</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            I sit where <strong className="text-foreground">definitions meet SQL</strong>: workshops on grain, versioned
            dbt models, tests, then a thin API so Sigma / Looker / planners inherit one truth — including{" "}
            <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong>-style high-volume marketplace narratives in
            this portfolio.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <Database className="h-5 w-5" aria-hidden />
            <h2 className="text-sm font-bold uppercase tracking-wide">Stack signal</h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {stackChips.map((chip) => (
              <span
                key={chip}
                className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>SQL &amp; modeling</span>
              <span className="font-mono text-primary">●●●●●</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-primary to-red-400" />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Marts / dbt / tests</span>
              <span className="font-mono text-primary">●●●●○</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-primary to-red-400" />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>BI &amp; storytelling</span>
              <span className="font-mono text-primary">●●●●○</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-primary to-red-400" />
            </div>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">Illustrative bars — not exam scores; full detail in the PDF.</p>
        </div>
      </section>

      {/* Role fit grid */}
      <section aria-labelledby="fit-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="fit-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
              Role fit — how I already work
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Hiring bar on the left; proof on the right. Built for recruiters and hiring managers who skim in seconds.
            </p>
          </div>
          <Link
            href="/data-pipeline"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            See the repo →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {jdItems.map(({ Icon, title, bullets }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-lg"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-red-400 opacity-90" aria-hidden />
              <div className="pl-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/15">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-mono text-xs font-bold text-muted-foreground/80">0{i + 1}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-foreground">{title}</h3>
                <ul className="mt-3 space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline roles */}
      <section aria-labelledby="roles-heading" className="space-y-4">
        <h2 id="roles-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Zap className="h-5 w-5 text-primary" aria-hidden />
          Selected impact
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((r) => (
            <div
              key={r.org}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br p-5 shadow-sm transition hover:shadow-md",
                r.accent,
              )}
            >
              <span className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-primary">
                {r.period}
              </span>
              <p className="mt-3 text-base font-bold text-foreground">{r.org}</p>
              <p className="text-sm text-muted-foreground">{r.role}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-md bg-white/80 px-2 py-0.5 text-[11px] font-medium text-foreground ring-1 ring-border/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="rounded-2xl border border-dashed border-primary/25 bg-red-50/30 px-5 py-4 text-center text-sm text-muted-foreground">
        Full history stays in the{" "}
        <a href={CV_PDF_HREF} className="font-medium text-primary underline-offset-4 hover:underline">
          PDF
        </a>
        . This page is the <strong className="text-foreground">visual pitch</strong> — explore{" "}
        <Link href="/dashboard" className="font-medium text-primary underline-offset-4 hover:underline">
          dashboards
        </Link>
        ,{" "}
        <Link href="/source-of-truth" className="font-medium text-primary underline-offset-4 hover:underline">
          metric truth
        </Link>
        , and{" "}
        <Link href="/ai-lab" className="font-medium text-primary underline-offset-4 hover:underline">
          self-service lab
        </Link>
        .
      </footer>
    </div>
  );
}
