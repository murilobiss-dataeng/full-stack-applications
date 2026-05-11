import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Database,
  Download,
  FileText,
  GitBranch,
  Github,
  GraduationCap,
  Languages,
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

/** Same tagline as `cv/cv-murilo-biss-resume.html` (PDF source). */
const PDF_TAGLINE = "Senior Data Engineer · Analytics Engineering · Python";

const kpis = [
  { value: "7+", label: "Years in data", hint: "SQL → marts → BI" },
  { value: "dbt", label: "Production", hint: "Snowflake · Databricks" },
  { value: "SF", label: "Snowflake", hint: "Marts · ELT · AB InBev + Tarmac" },
  { value: "PBI+", label: "BI & visuals", hint: "Power BI · enterprise BI" },
] as const;

/** Mirrors PDF “Core competencies” themes; chips are a compact index of the same stack. */
const stackChips = [
  "Python",
  "SQL",
  "Snowflake",
  "dbt",
  "Spark",
  "Airflow",
  "AWS",
  "Azure",
  "GCP",
  "Kafka",
  "Delta Lake",
  "Terraform",
  "Power BI",
  "Looker",
  "Agile / Scrum",
] as const;

const credentialChips = [
  "AWS Certified Cloud Practitioner",
  "Astronomer Certification — Apache Airflow Fundamentals",
  "Fullstack Labs Certified — Data Engineer",
] as const;

const profileParagraphs = [
  <>
    Data Engineer and Analytics Engineer with 7+ years of experience turning operational and business data into reliable,
    scalable analytics. Strong SQL practice, cloud platforms (AWS, Azure, GCP), and production ETL/ELT design. 5+ years hands-on
    with <strong className="text-foreground">Databricks</strong>, <strong className="text-foreground">Snowflake</strong>, and
    Spark (PySpark); 3+ years with Azure Data Factory. <strong className="text-foreground">AWS Certified Cloud Practitioner</strong>
    ; Apache Airflow certified (Astronomer); practical experience with data lake and data warehouse architectures. Fluent delivery in
    Python, SQL, dbt, Spark, Snowflake, and Databricks, with emphasis on performance, observability, and maintainable pipelines.
  </>,
  <>
    Comfortable translating business rules into data models, collaborating in Agile Scrum teams, and communicating results to
    technical and non-technical stakeholders. Driven by automation, clear metrics, and measurable impact.
  </>,
] as const;

const coreCompetencies = [
  {
    title: "Cloud & warehouse",
    body:
      "Snowflake (warehousing, tasks, sharing); AWS (S3, Glue, Redshift, Athena); Azure (Databricks, Data Factory, DevOps); GCP (BigQuery).",
  },
  {
    title: "Data & orchestration",
    body:
      "PySpark, Kafka, Delta Lake; Snowflake + dbt in production; Airflow; CI/CD (Azure DevOps); observability.",
  },
  {
    title: "BI & analytics",
    body: "Power BI, Looker, visualization, metric-driven decisions.",
  },
  {
    title: "Delivery",
    body: "Agile Scrum, cross-functional work, requirements analysis, solution architecture, project leadership.",
  },
] as const;

const certifications = [
  "AWS Certified Cloud Practitioner",
  "Astronomer Certification — Apache Airflow Fundamentals",
  "Fullstack Labs Certified — Data Engineer",
] as const;

const education = [
  "FIAP — Postgraduate (lato sensu), Software Engineering (Mar 2025 — Aug 2026)",
  "Pontifícia Universidade Católica do Paraná (PUCPR) — Production Engineering (2011 — 2015)",
  "Universidade Tecnológica Federal do Paraná (UTFPR) — Civil Engineering (2007 — 2012)",
] as const;

const languages = [
  "English — native or bilingual proficiency",
  "Portuguese — native or bilingual proficiency",
  "Spanish — limited working proficiency",
] as const;

type CvExperienceRole = {
  org: string;
  title: string;
  period: string;
  location?: string;
  ledes?: readonly string[];
  bullets: readonly string[];
  accent: string;
  tags: readonly string[];
};

/** Chronology and copy aligned with `cv/cv-murilo-biss-resume.html` / PDF. */
const experienceRoles: CvExperienceRole[] = [
  {
    org: "Tarmac.IO",
    title: "Senior Data Engineer",
    period: "May 2025 — present",
    location: "Brazil",
    ledes: [
      "Embedded — logistics. Supply chain and logistics data platform: real-time inventory, route optimization, material lifecycle. Medallion architecture (Bronze / Silver / Gold), modern ELT, scalable data products for operations and BI.",
      "Embedded — healthcare. Workforce and compensation analytics on Databricks Lakehouse; Delta Live Tables; data quality, lineage, and governance. Infrastructure automation, orchestration, and performance tuning with Terraform and cloud-native tooling.",
    ],
    bullets: [
      "Lead data engineering for internal tools and customer-facing products: Python, SQL, dbt, Spark.",
      "Migrate legacy systems to Snowflake and Databricks; scalable models for analytics and reporting.",
      "Partner with product and engineering; automated monitoring and retries for scheduled jobs and notifications.",
      "Agile ceremonies and sprint planning with global teams; AWS and Terraform for provisioning and automation.",
    ],
    accent: "from-primary/20 to-transparent",
    tags: ["dbt", "Databricks", "Snowflake", "DLT", "Terraform"],
  },
  {
    org: "AB InBev",
    title: "Data Engineer",
    period: "Aug 2023 — May 2025",
    ledes: [
      "The Loop Hub. Centralized platform for global sales, marketing, and operations: standardized KPIs and decisions. Lakehouse on Databricks and Snowflake; scalable models and near real-time analytics. Factory-style ETL pattern for modular, reusable pipelines across domains.",
    ],
    bullets: [
      "Requirements analysis, business rules, and structures for a unified analytics environment.",
      "ETL in Databricks and Snowflake; Spark integrations; Azure Data Factory and Azure DevOps for reliability.",
      "Agile Scrum with multidisciplinary teams; clear communication of results and blockers.",
    ],
    accent: "from-red-100/80 to-transparent",
    tags: ["Databricks", "Snowflake", "Factory ETL", "Global KPIs"],
  },
  {
    org: "Banco Bari",
    title: "Data Engineer",
    period: "Jan 2022 — Sep 2023",
    location: "Curitiba, PR",
    ledes: [
      "Modern banking analytics platform: internal and external financial sources on AWS (S3, Glue, Athena, Redshift). ETL for scalable processing, reliable ingestion, and performance on large datasets; improved accessibility for financial and operational teams.",
    ],
    bullets: [
      "ETL with AWS (S3, Athena, EC2, EKS, ECR, Redshift, Glue); advanced SQL.",
      "Apache Airflow DAGs for reliability and observability; Agile planning and delivery.",
    ],
    accent: "from-primary/15 to-transparent",
    tags: ["AWS", "Glue", "Redshift", "Airflow"],
  },
  {
    org: "Banco Bari",
    title: "Senior Data Analyst",
    period: "Dec 2020 — Dec 2021",
    location: "Curitiba, PR",
    bullets: [
      "Dashboards and KPIs for business units; Power BI, SQL, AWS Athena, Power Query M, Python.",
      "Exploratory analysis, metric definition for objectives, and stronger data culture across areas.",
    ],
    accent: "from-primary/15 to-transparent",
    tags: ["Power BI", "SQL", "Athena", "Python"],
  },
  {
    org: "Banco Bari",
    title: "Project Analyst",
    period: "Aug 2019 — Dec 2020",
    location: "Curitiba and region, Brazil",
    bullets: [
      "Outsourcing and IT projects: scope, budget, planning, risk, status reporting, and contractual compliance.",
      "Phases, estimates, supplier payments, negotiations, and third-party contracts.",
    ],
    accent: "from-primary/15 to-transparent",
    tags: ["Projects", "Agile context"],
  },
  {
    org: "Groupe Renault (Segula Technologies)",
    title: "Process Analyst",
    period: "Mar 2019 — Aug 2019",
    location: "Curitiba, Paraná",
    bullets: [
      "Project financial control (investments vs expenses); CAPEX/OPEX on vehicle capacity programs (large financial volumes).",
      "Stakeholder coordination, budgets aligned to strategy, and reporting to management.",
    ],
    accent: "from-muted/40 to-transparent",
    tags: ["Finance", "CAPEX/OPEX"],
  },
  {
    org: "Bradesco Seguros",
    title: "Project Analyst",
    period: "Aug 2016 — Aug 2018",
    location: "Curitiba and region, Brazil",
    bullets: [
      "BIA — Business Intelligence Analytics (social security): MS Project, reduced delivery timeline, milestone reporting.",
      "Risk management, integrated testing, partnerships with business areas, process definition support.",
    ],
    accent: "from-muted/40 to-transparent",
    tags: ["MS Project", "BIA"],
  },
  {
    org: "HSBC",
    title: "Process Analyst",
    period: "May 2014 — Aug 2016",
    location: "Curitiba and region, Brazil",
    bullets: [
      "Process improvement, root-cause analysis, tools for control and management, SLA compliance.",
      "Benchmarks, process documentation to standards.",
    ],
    accent: "from-slate-100/90 to-transparent",
    tags: ["Banking", "Process", "SLA"],
  },
];

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
    Icon: ShieldCheck,
    ask: "Process discipline and regulated-industry delivery (including HSBC)",
    proof:
      "HSBC (May 2014–Aug 2016) as Process Analyst: process improvement, root-cause analysis, SLA compliance, and documentation in a regulated banking environment. Same rigor today when grain, SLAs, and auditability matter on Snowflake or Databricks.",
  },
] as const;

export function CvContent() {
  return (
    <div className="space-y-10 px-1 sm:px-0">
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-white via-red-50/40 to-white px-6 py-8 shadow-lg shadow-primary/10 sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/5 blur-2xl" aria-hidden />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {PDF_TAGLINE}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Murilo Biss</h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              On-page CV matches the{" "}
              <a href={CV_PDF_HREF} className="font-medium text-primary underline-offset-4 hover:underline">
                downloadable PDF
              </a>{" "}
              (same profile, competencies, experience, certifications, education, and languages). The sections below repeat that
              résumé for accessibility; the{" "}
              <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> portfolio elsewhere on this site is a separate
              demo layer.
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
        <a
          href="https://github.com/murilobiss"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm shadow-sm transition hover:border-primary/40 hover:shadow-md"
        >
          <Github className="h-4 w-4 text-primary" aria-hidden />
          <span className="font-medium text-foreground">github.com/murilobiss</span>
        </a>
        <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          Brazil
        </span>
      </section>

      <section
        aria-labelledby="summary-heading"
        className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:border-l-4 lg:border-l-primary"
      >
        <h2 id="summary-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
          Professional profile
        </h2>
        {profileParagraphs.map((p, i) => (
          <p key={i} className={cn("text-sm leading-relaxed text-muted-foreground sm:text-base", i === 0 ? "mt-4" : "mt-3")}>
            {p}
          </p>
        ))}
      </section>

      <section aria-labelledby="comp-heading">
        <h2 id="comp-heading" className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <Database className="h-5 w-5 text-primary" aria-hidden />
          Core competencies
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {coreCompetencies.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-primary">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden />
            <h2 className="text-sm font-bold uppercase tracking-wide">Portfolio demo (not on the PDF)</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            The <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> pages on this site are a fictional scenario
            for hiring managers to click through: metrics API, dashboards, and governance copy. They do not change the facts on
            the résumé or PDF.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-primary">
            <Database className="h-5 w-5 shrink-0" aria-hidden />
            <h2 className="text-sm font-bold uppercase tracking-wide">Stack signal (same themes as PDF)</h2>
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
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Certifications (PDF)</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {credentialChips.map((chip) => (
              <span
                key={chip}
                className="rounded-lg border border-emerald-700/20 bg-emerald-50/90 px-3 py-1.5 text-[11px] font-medium leading-snug text-foreground sm:text-xs"
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
            Bars are illustrative only; authoritative wording is the PDF and the sections above.
          </p>
        </div>
      </section>

      <section aria-labelledby="certs-heading" className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <h2 id="certs-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Award className="h-5 w-5 text-primary" aria-hidden />
          Certifications
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground sm:text-base">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="edu-heading" className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <h2 id="edu-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <GraduationCap className="h-5 w-5 text-primary" aria-hidden />
          Education
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground sm:text-base">
          {education.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lang-heading" className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <h2 id="lang-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Languages className="h-5 w-5 text-primary" aria-hidden />
          Languages
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground sm:text-base">
          {languages.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="fit-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="fit-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Target className="h-5 w-5 text-primary" aria-hidden />
              Role fit → how I operate (portfolio lens)
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Optional hiring-manager mapping; factual employment and education are in the PDF-aligned sections above and in the
              experience timeline below.
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

      <section aria-labelledby="roles-heading" className="space-y-4">
        <h2 id="roles-heading" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Zap className="h-5 w-5 text-primary" aria-hidden />
          Professional experience (same order and substance as PDF)
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {experienceRoles.map((r) => (
            <div
              key={`${r.org}-${r.title}-${r.period}`}
              className={cn(
                "flex flex-col rounded-2xl border border-border bg-gradient-to-br p-5 shadow-sm transition hover:shadow-md sm:p-6",
                r.accent,
              )}
            >
              <span className="w-fit rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-primary">
                {r.period}
              </span>
              <p className="mt-3 text-lg font-bold text-foreground">{r.org}</p>
              <p className="text-sm font-medium text-muted-foreground">{r.title}</p>
              {r.location ? <p className="text-xs text-muted-foreground">{r.location}</p> : null}
              {r.tags.length > 0 ? (
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
              ) : null}
              <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
                {"ledes" in r && r.ledes
                  ? r.ledes.map((para, idx) => (
                      <p key={`${r.org}-lede-${idx}`} className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {para}
                      </p>
                    ))
                  : null}
                {r.bullets.map((para, idx) => (
                  <p key={`${r.org}-b-${idx}`} className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    • {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="rounded-2xl border border-dashed border-primary/25 bg-red-50/40 px-5 py-5 text-center text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">PDF</strong> is the same résumé as this page:{" "}
          <a href={CV_PDF_HREF} className="font-medium text-primary underline-offset-4 hover:underline">
            download
          </a>{" "}
          or{" "}
          <a href={CV_PDF_HREF} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
            open
          </a>
          . Explore the demo app:{" "}
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
