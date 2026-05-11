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
  { value: "SF", label: "Snowflake", hint: "Marts · ELT · AB InBev + Tarmac" },
  { value: "PBI+", label: "BI & visuals", hint: "Power BI · enterprise BI" },
] as const;

const stackChips = [
  "Python",
  "SQL",
  "Snowflake",
  "dbt",
  "Spark",
  "Airflow",
  "AWS",
  "Azure",
  "Terraform",
  "Power BI",
  "Agile / PO",
] as const;

const credentialChips = ["AWS Certified Cloud Practitioner", "Apache Airflow (Astronomer)"] as const;

/** Full role-fit mapping (same substance as the original CV page). */
const jdMapping = [
  {
    Icon: Target,
    ask: "Translate tax and finance questions into governed marts, metrics, and self-service BI",
    proof:
      "Own the middle: requirements workshops, metric grain, naming, and dbt or SQL models on Snowflake or Databricks before dashboards, at Tarmac.IO (healthcare compensation, logistics), AB InBev global KPIs, and Banco Bari banking analytics. Stakeholders got Power BI and other enterprise BI on definitions I could explain and reconcile.",
  },
  {
    Icon: GitBranch,
    ask: "dbt (or equivalent) as the default for reusable transforms and tests",
    proof:
      "Production dbt with Snowflake and Databricks; medallion patterns; factory-style reusable pipelines at AB InBev. This repo shows singular tests, relationship tests, and mart rollups the way an analytics team would gate a release.",
  },
  {
    Icon: BarChart3,
    ask: "Data visualization plus a metrics-catalog mindset (semantic hand-off)",
    proof:
      "Shipped dashboards and reporting packs in Power BI in production roles; here the /api/metrics contract and BI surface mimic the same boundary you would get from a governed semantic layer before any specific BI tool: documented, versionable, and safe for analysts.",
  },
  {
    Icon: Zap,
    ask: "5+ years at scale: SQL depth, ETL, controls, independent prioritization",
    proof:
      "7+ years in data roles; strong Data Engineering and Analytics Engineering delivery; Snowflake and Databricks in production (marts, ELT, factory patterns); Spark/PySpark 5+ years; Airflow in production; Agile with global teams. I default to tests, lineage, and clear ownership of the number on the slide.",
  },
  {
    Icon: Layers,
    ask: "Product ownership and cross-functional delivery (including HSBC)",
    proof:
      "Product Owner experience at HSBC: backlog, prioritization, and stakeholder alignment in a regulated banking context, alongside engineering. At Tarmac and AB InBev I stayed embedded with product and engineering; Terraform/CI where relevant. JIRA and backlog language while grain and SLAs stay explicit.",
  },
] as const;

const roles = [
  {
    org: "Tarmac.IO",
    role: "Senior Data Engineer",
    period: "May 2025 to present",
    accent: "from-primary/20 to-transparent",
    tags: ["dbt", "Databricks", "Snowflake", "DLT", "Terraform"],
    body: [
      "Embedded: logistics company: supply chain data platform, real-time inventory, routes, material lifecycle; medallion Bronze/Silver/Gold, ELT, data products for ops and BI.",
      "Embedded: healthcare: workforce and compensation analytics on Databricks Lakehouse; Delta Live Tables, data quality, lineage, governance; Terraform and cloud-native automation.",
      "Leading client data engineering for internal tools and customer-facing products: Python, SQL, Spark, migrating legacy to Snowflake/Databricks, scalable models, monitoring and retries for jobs, Agile with global teams, AWS + Terraform.",
    ],
  },
  {
    org: "AB InBev",
    role: "Data Engineer",
    period: "Aug 2023 to May 2025",
    accent: "from-red-100/80 to-transparent",
    tags: ["Databricks", "Snowflake", "Factory ETL", "Global KPIs"],
    body: [
      "The Loop Hub: centralized data platform for sales, marketing, and ops across markets; standardized KPIs and decisions; Databricks + Snowflake lakehouse, scalable models, near real-time analytics.",
      "Factory-style reusable ETL across domains; requirements analysis, business rules, structures for unified analytics; Spark, Azure Data Factory, Azure DevOps; Agile with multidisciplinary teams; communicating results and blockers in ceremonies.",
    ],
  },
  {
    org: "Banco Bari",
    role: "Data Engineer / Senior Data Analyst",
    period: "2019 to 2023 · Curitiba, PR",
    accent: "from-primary/15 to-transparent",
    tags: ["AWS", "Glue", "Redshift", "Airflow", "Power BI"],
    body: [
      "Data Engineer (Jan 2022 to Sep 2023): modern banking analytics platform with AWS (S3, Glue, Athena, Redshift), ETL, Airflow DAGs, advanced SQL, Agile delivery, cross-functional communication.",
      "Senior Data Analyst (Dec 2020 to Dec 2021): dashboards and KPIs for business units; Power BI, SQL, AWS Athena, Power Query M, Python; exploratory analysis, data culture; defining and tracking metrics for objectives.",
      "Project Analyst (Aug 2019 to Dec 2020): outsourcing and IT projects with scope, budget, planning, risk, status reporting.",
    ],
  },
  {
    org: "HSBC",
    role: "Product Owner",
    period: "Banking · Agile delivery (chronology in PDF)",
    accent: "from-slate-100/90 to-transparent",
    tags: ["Agile", "Backlog", "Stakeholders", "Regulatory context"],
    body: [
      "Owned prioritization, backlog, and acceptance criteria for data and reporting initiatives with business and engineering in a regulated banking environment.",
      "Partnered across ceremonies and roadmaps so delivery stayed aligned with risk, compliance, and customer outcomes; full scope and dates are consolidated in the PDF.",
    ],
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
          <div className="max-w-2xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Data visualization · Analytics Engineering · Data Engineering · Snowflake · Product
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Murilo Biss</h1>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              <strong className="font-semibold text-foreground">Data visualization</strong> is often the hiring lens, but I
              am not only that: I ship the full stack around it as{" "}
              <strong className="font-semibold text-foreground">Analytics Engineering</strong> and{" "}
              <strong className="font-semibold text-foreground">Data Engineering</strong> when the team is small, plus{" "}
              <strong className="font-semibold text-foreground">Product Owner</strong> experience at HSBC (Agile banking,
              backlog, stakeholders). I own the path from messy operational data to{" "}
              <strong className="font-semibold text-foreground">named metrics, tested SQL, and visuals that match the mart</strong>.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              From raw feeds to <span className="font-medium text-foreground">metrics that survive scrutiny</span>, same
              rigor whether the story is{" "}
              <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> in this portfolio or your production
              Snowflake / Databricks warehouse.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={CV_PDF_HREF} download className={cn(buttonVariants(), "gap-2 shadow-md shadow-primary/20")}>
                <Download className="h-4 w-4" aria-hidden />
                Download CV (PDF)
              </a>
              <a
                href={CV_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2 border-primary/30 bg-white/80")}
              >
                <FileText className="h-4 w-4" aria-hidden />
                Open PDF in new tab
              </a>
              <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "gap-2 bg-white/80")}>
                <LineChart className="h-4 w-4" aria-hidden />
                Live metrics
              </Link>
              <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "gap-1")}>
                Portfolio home
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

      {/* Contact */}
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
          linkedin.com/in/murilobiss
        </a>
        <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          Brazil · English &amp; Portuguese (professional)
        </span>
      </section>

      {/* Bento: full “why hire” + stack */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden />
            <h2 className="text-sm font-bold uppercase tracking-wide">What you get when you hire me</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Someone who <strong className="text-foreground">frames the question with you</strong>, validates cuts in SQL and
            dbt, documents assumptions, and lands the answer in{" "}
            <strong className="text-foreground">Power BI or your standard enterprise BI stack</strong>, while staying
            pipeline-adjacent enough to unblock <strong className="text-foreground">Snowflake</strong> or the lakehouse when the mart needs a change.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            I care that <strong className="text-foreground">the chart matches the agreed definition</strong> and that we can
            explain variances, including when the business is a high-volume marketplace like the fictional{" "}
            <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> scenario used in this portfolio (large-scale
            last-mile delivery and marketplace ops; not a real company).
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-primary">
            <Database className="h-5 w-5 shrink-0" aria-hidden />
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
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Credentials</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {credentialChips.map((chip) => (
              <span
                key={chip}
                className="rounded-lg border border-emerald-700/20 bg-emerald-50/90 px-3 py-1.5 text-xs font-medium text-foreground"
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
              <span>Snowflake / marts / dbt / tests</span>
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
          <p className="mt-3 text-[11px] text-muted-foreground">
            Bars are illustrative emphasis only; full role history and dates remain in the PDF.
          </p>
        </div>
      </section>

      {/* Professional summary, full copy */}
      <section
        aria-labelledby="summary-heading"
        className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:border-l-4 lg:border-l-primary"
      >
        <h2 id="summary-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
          Professional summary
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Seven-plus years moving from raw operational and financial data to{" "}
          <strong className="text-foreground">metrics and visuals people act on</strong>. Stack: Python, SQL, Spark (PySpark),{" "}
          <strong className="text-foreground">Snowflake</strong>, Databricks, AWS (including AWS Certified Cloud Practitioner) and
          Azure data services, Airflow, dbt, <strong className="text-foreground">Power BI</strong> and other enterprise BI. Comfortable across{" "}
          <strong className="text-foreground">Data Engineering</strong>, <strong className="text-foreground">Analytics Engineering</strong>, and{" "}
          <strong className="text-foreground">data visualization</strong>, including VAT and statutory reporting cuts where Tax
          is in the room; <strong className="text-foreground">Product Owner</strong> delivery at HSBC for Agile, backlog, and
          stakeholder alignment. Agile teams with global stakeholders.
        </p>
      </section>

      {/* Role fit, full ask + proof per row */}
      <section aria-labelledby="fit-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="fit-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Target className="h-5 w-5 text-primary" aria-hidden />
              Role bar → how I already operate
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Strong Analytics Engineering teams care about semantic clarity, test coverage, and safe self-service. Below is a
              straight line from what you are hiring for to what I have shipped, plus this repo as a compact demo you can click
              through.
            </p>
          </div>
          <Link href="/infrastructure?section=pipeline" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            See the repo →
          </Link>
        </div>
        <div className="space-y-4">
          {jdMapping.map(({ Icon, ask, proof }, i) => (
            <div
              key={ask}
              className="relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:border-primary/25 hover:shadow-md sm:p-6"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-red-400" aria-hidden />
              <div className="pl-4 sm:pl-5">
                <div className="flex flex-wrap items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs font-bold text-muted-foreground">0{i + 1}</span>
                    <h3 className="mt-1 text-base font-semibold leading-snug text-foreground sm:text-lg">{ask}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{proof}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles, full paragraphs */}
      <section aria-labelledby="roles-heading" className="space-y-4">
        <h2 id="roles-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Zap className="h-5 w-5 text-primary" aria-hidden />
          Selected roles
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {roles.map((r) => (
            <div
              key={r.org}
              className={cn(
                "flex flex-col rounded-2xl border border-border bg-gradient-to-br p-5 shadow-sm transition hover:shadow-md sm:p-6",
                r.accent,
              )}
            >
              <span className="w-fit rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-primary">
                {r.period}
              </span>
              <p className="mt-3 text-lg font-bold text-foreground">{r.org}</p>
              <p className="text-sm font-medium text-muted-foreground">{r.role}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-medium text-foreground ring-1 ring-border/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
                {r.body.map((para, idx) => (
                  <p key={`${r.org}-${idx}`} className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="rounded-2xl border border-dashed border-primary/25 bg-red-50/40 px-5 py-5 text-center text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">PDF</strong> remains the signed-off résumé file.{" "}
          <a href={CV_PDF_HREF} className="font-medium text-primary underline-offset-4 hover:underline">
            download
          </a>{" "}
          or{" "}
          <a href={CV_PDF_HREF} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
            open
          </a>
          . This page highlights role fit, stack, and selected experience; explore{" "}
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
        </p>
      </footer>
    </div>
  );
}
