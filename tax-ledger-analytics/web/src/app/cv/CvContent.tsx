import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Database,
  Download,
  FileText,
  GitBranch,
  GraduationCap,
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
  { value: "∞", label: "QA first", hint: "Charts · reconciliations" },
] as const;

const stackChips = ["Python", "Spark", "Airflow", "AWS", "Azure", "Terraform", "Agile / global"] as const;

/** Full role-fit mapping (same substance as the original CV page). */
const jdMapping = [
  {
    Icon: Target,
    ask: "Turn tax / finance questions into trusted metrics, SQL, and BI deliverables",
    proof:
      "Own the question side: workshops, grain checks, and validated reporting before leadership sees a number — Tarmac.IO (healthcare compensation, logistics), AB InBev global KPIs, Banco Bari banking analytics. Stakeholders got Looker/Power BI packs I could explain and reconcile.",
  },
  {
    Icon: GitBranch,
    ask: "Work with tested transforms (dbt-style) and catch breaks before the dashboard",
    proof:
      "Production dbt with Snowflake and Databricks; medallion patterns; factory-style reusable pipelines at AB InBev. This repo shows singular tests, relationship tests, and mart rollups the way an analytics team would gate a release.",
  },
  {
    Icon: BarChart3,
    ask: "Sigma / Looker-class experience: metrics catalog mindset",
    proof:
      "Shipped BI in Looker and Power BI in real roles; here the /api/metrics contract + dashboard pages mimic a semantic layer boundary — documented, versionable, and safe for analysts.",
  },
  {
    Icon: Zap,
    ask: "5+ years at scale: SQL depth, ETL, controls, independent prioritization",
    proof:
      "7+ years data roles; Senior Data Analyst background; Spark/PySpark 5+ years; Airflow certified; Agile with global teams. I default to reconciliations, clear documentation, and ownership of the numbers in the deck — what hiring managers expect from a senior Data Analyst.",
  },
  {
    Icon: Layers,
    ask: "Work across Data Eng, tax, finance, and product without dropping detail",
    proof:
      "Embedded with product and engineering at Tarmac; cross-market alignment at AB InBev; Terraform/CI where relevant. I speak JIRA and backlog language while keeping grain and SLAs explicit.",
  },
] as const;

const roles = [
  {
    org: "Tarmac.IO",
    role: "Senior Data Engineer",
    period: "May 2025 — present · Brazil",
    accent: "from-primary/20 to-transparent",
    tags: ["dbt", "Snowflake", "Databricks", "DLT", "Terraform"],
    body: [
      "Embedded: logistics company — supply chain data platform, real-time inventory, routes, material lifecycle; medallion Bronze/Silver/Gold, ELT, data products for ops and BI.",
      "Embedded: healthcare — workforce & compensation analytics on Databricks Lakehouse; Delta Live Tables, data quality, lineage, governance; Terraform and cloud-native automation.",
      "Leading client data engineering for internal tools and customer-facing products: Python, SQL, Spark, migrating legacy to Snowflake/Databricks, scalable models, monitoring and retries for jobs, Agile with global teams, AWS + Terraform.",
    ],
  },
  {
    org: "AB InBev",
    role: "Data Engineer",
    period: "Aug 2023 — May 2025",
    accent: "from-red-100/80 to-transparent",
    tags: ["Databricks", "Snowflake", "Factory ETL", "Global KPIs"],
    body: [
      "The Loop Hub — centralized data platform for sales, marketing, and ops across markets; standardized KPIs and decisions; Databricks + Snowflake lakehouse, scalable models, near real-time analytics.",
      "Factory-style reusable ETL across domains; requirements analysis, business rules, structures for unified analytics; Spark, Azure Data Factory, Azure DevOps; Agile with multidisciplinary teams; communicating results and blockers in ceremonies.",
    ],
  },
  {
    org: "Banco Bari",
    role: "Data Engineer / Senior Data Analyst",
    period: "2019 — 2023 · Curitiba, PR",
    accent: "from-primary/15 to-transparent",
    tags: ["AWS", "Glue", "Redshift", "Airflow", "Power BI"],
    body: [
      "Data Engineer (Jan 2022 — Sep 2023): modern banking analytics platform — AWS (S3, Glue, Athena, Redshift), ETL, Airflow DAGs, advanced SQL, Agile delivery, cross-functional communication.",
      "Senior Data Analyst (Dec 2020 — Dec 2021): dashboards and KPIs for business units; Power BI, SQL, AWS Athena, Power Query M, Python; exploratory analysis, data culture; defining and tracking metrics for objectives.",
      "Project Analyst (Aug 2019 — Dec 2020): outsourcing & IT projects — scope, budget, planning, risk, status reporting.",
    ],
  },
] as const;

const certifications = [
  "Astronomer — Apache Airflow Fundamentals",
  "Liderança e Gestão de Pessoas",
  "Fullstack Labs — Certified Data Engineer",
] as const;

const education = [
  "FIAP — Pós-graduação Lato Sensu, Engenharia de Software (March 2025 — August 2026)",
  "Pontifícia Universidade Católica do Paraná — Engenharia de Produção (2011 — 2015)",
  "Universidade Tecnológica Federal do Paraná — Engenharia Civil (2007 — 2012)",
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
              Data Analyst · portfolio demo
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Murilo Biss</h1>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              <strong className="font-semibold text-foreground">Senior Data Analyst</strong> (comfortable in SQL-heavy and
              pipeline-adjacent work when the team is small). I focus on turning operational and financial data into{" "}
              <strong className="font-semibold text-foreground">clear cuts, checks, and visuals</strong>{" "}
              — the profile you want when the mart exists but the story still needs to be right.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              From raw feeds to <span className="font-medium text-foreground">metrics that survive scrutiny</span> — same
              rigor whether the story is{" "}
              <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> in this portfolio or your production
              warehouse.
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
            <h2 className="text-sm font-bold uppercase tracking-wide">What you get when you hire me (Data Analyst)</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Someone who <strong className="text-foreground">frames the question with you</strong>, validates cuts in SQL,
            documents assumptions, and lands the answer in a dashboard or slide — partnering with Data Engineering when the
            pipeline or mart needs a change, without losing the business thread.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            I care that <strong className="text-foreground">the chart matches the agreed definition</strong> and that we can
            explain variances — including when the business is a high-volume marketplace like the fictional{" "}
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
          <p className="mt-3 text-[11px] text-muted-foreground">
            Bars are illustrative emphasis only; certifications, education, and full timeline remain in the PDF and in the
            sections below.
          </p>
        </div>
      </section>

      {/* Professional summary — full copy */}
      <section
        aria-labelledby="summary-heading"
        className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:border-l-4 lg:border-l-primary"
      >
        <h2 id="summary-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
          Professional summary
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Seven-plus years turning operational and financial data into{" "}
          <strong className="text-foreground">reporting packs and dashboards people act on</strong>. Stack: Python, SQL,
          Spark (PySpark), Databricks, Snowflake, AWS and Azure data services, Airflow, dbt where the team uses it,{" "}
          <strong className="text-foreground">Looker</strong> and <strong className="text-foreground">Power BI</strong>. I am
          strongest on requirements, validation, and the BI hand-off — pairing with engineering on ingestion or models when
          the answer depends on it — in Agile teams with global stakeholders.
        </p>
      </section>

      {/* Role fit — full ask + proof per row */}
      <section aria-labelledby="fit-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="fit-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Target className="h-5 w-5 text-primary" aria-hidden />
              Role bar → how I already operate
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Strong data teams care about clear definitions, QA, and visuals that match the warehouse. Below is a straight
              line from what you are hiring for to what I have shipped — plus this repo as a compact demo you can click
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

      {/* Roles — full paragraphs */}
      <section aria-labelledby="roles-heading" className="space-y-4">
        <h2 id="roles-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Zap className="h-5 w-5 text-primary" aria-hidden />
          Selected roles
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
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

      {/* Certifications & education */}
      <section className="grid gap-4 md:grid-cols-2" aria-label="Certifications and education">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
            <Award className="h-5 w-5 text-primary" aria-hidden />
            Certifications
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {certifications.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
            <GraduationCap className="h-5 w-5 text-primary" aria-hidden />
            Education
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {education.map((e) => (
              <li key={e} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="rounded-2xl border border-dashed border-primary/25 bg-red-50/40 px-5 py-5 text-center text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">PDF</strong> remains the signed-off résumé file —{" "}
          <a href={CV_PDF_HREF} className="font-medium text-primary underline-offset-4 hover:underline">
            download
          </a>{" "}
          or{" "}
          <a href={CV_PDF_HREF} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
            open
          </a>
          . This page mirrors the <strong className="text-foreground">same information depth</strong> with a{" "}
          <strong className="text-foreground">DoorRush-style</strong> layout; explore{" "}
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
