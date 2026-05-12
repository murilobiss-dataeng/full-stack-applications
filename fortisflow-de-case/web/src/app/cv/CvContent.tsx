import { Fragment } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Database,
  Download,
  GitBranch,
  Github,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import { CvPrintButton } from "@/components/CvPrintButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CV_PDF_HREF = "/cv-murilo-biss.pdf";
/** Server-generated PDF (headless Chromium renders /cv — same HTML/CSS as the live page). */
const CV_PDF_API = "/api/cv/pdf";

const PDF_TAGLINE = "Senior Data Engineer · Snowflake · ELT · SQL";

/** Single headline stat beside name; contact actions sit in the same column. */
const YEARS_IN_DATA_KPI = {
  value: "7+",
  label: "Years in data",
  hint: "Ingest → ELT → governed marts",
} as const;

/** Skill matrix: max level Advanced (no “Expert”). Lowest tier is “Exposure” (light / early use, softer than “Novice”). */
const skillMatrixSections = [
  {
    title: "Programming languages",
    rows: [
      { name: "SQL", years: "7+", level: "Advanced" as const },
      { name: "Python", years: "7", level: "Advanced" as const },
      { name: "Bash / shell", years: "5", level: "Intermediate" as const },
      { name: "Scala", years: "2", level: "Intermediate" as const },
      { name: "R", years: "2", level: "Beginner" as const },
      { name: "TypeScript", years: "2", level: "Beginner" as const },
      { name: "Java", years: "1", level: "Exposure" as const },
      { name: "YAML", years: "4", level: "Intermediate" as const },
      { name: "Jinja", years: "1", level: "Exposure" as const },
      { name: "Go", years: "1", level: "Exposure" as const },
    ],
  },
  {
    title: "Frameworks and libraries",
    rows: [
      { name: "dbt", years: "1,5", level: "Advanced" as const },
      { name: "Spark / PySpark", years: "4", level: "Advanced" as const },
      { name: "Apache Airflow", years: "4", level: "Advanced" as const },
      { name: "Delta Lake / DLT", years: "3", level: "Advanced" as const },
      { name: "Pandas / Polars", years: "4", level: "Intermediate" as const },
      { name: "GE (data tests)", years: "2", level: "Beginner" as const },
      { name: "Apache Iceberg", years: "1", level: "Exposure" as const },
      { name: "Apache Hudi", years: "1", level: "Exposure" as const },
      { name: "OpenLineage", years: "1", level: "Exposure" as const },
      { name: "PyArrow / Parquet", years: "3", level: "Intermediate" as const },
      { name: "FastAPI", years: "2", level: "Beginner" as const },
      { name: "Apache Flink", years: "1", level: "Exposure" as const },
      { name: "Ray", years: "1", level: "Exposure" as const },
    ],
  },
  {
    title: "Databases and products",
    rows: [
      { name: "Snowflake", years: "2", level: "Advanced" as const },
      { name: "Databricks", years: "4", level: "Advanced" as const },
      { name: "Redshift", years: "2", level: "Intermediate" as const },
      { name: "Athena (Presto SQL)", years: "4", level: "Intermediate" as const },
      { name: "PostgreSQL", years: "5", level: "Advanced" as const },
      { name: "SQL Server", years: "2", level: "Intermediate" as const },
      { name: "Kafka", years: "3", level: "Intermediate" as const },
      { name: "MongoDB", years: "1", level: "Exposure" as const },
      { name: "Redis", years: "2", level: "Beginner" as const },
      { name: "DuckDB", years: "2", level: "Intermediate" as const },
      { name: "MySQL / MariaDB", years: "2", level: "Beginner" as const },
      { name: "OpenSearch / ES", years: "1", level: "Exposure" as const },
      { name: "BigQuery", years: "1", level: "Exposure" as const },
      { name: "DynamoDB", years: "1", level: "Exposure" as const },
      { name: "SQLite", years: "3", level: "Intermediate" as const },
      { name: "Oracle", years: "1", level: "Exposure" as const },
      { name: "TimescaleDB", years: "1", level: "Exposure" as const },
    ],
  },
  {
    title: "Cloud platforms & infrastructure",
    rows: [
      { name: "Terraform", years: "3", level: "Intermediate" as const },
      { name: "AWS", years: "5", level: "Advanced" as const },
      { name: "CloudFormation", years: "2", level: "Beginner" as const },
      { name: "Azure", years: "3", level: "Intermediate" as const },
      { name: "GCP (BQ, IAM, GCS)", years: "1", level: "Exposure" as const },
      { name: "Docker", years: "3", level: "Intermediate" as const },
      { name: "Kubernetes", years: "2", level: "Intermediate" as const },
      { name: "GitHub Actions", years: "3", level: "Intermediate" as const },
      { name: "Azure DevOps", years: "2", level: "Beginner" as const },
      { name: "VPC / networking", years: "3", level: "Intermediate" as const },
      { name: "Secrets / Vault", years: "3", level: "Intermediate" as const },
      { name: "Pulumi", years: "1", level: "Exposure" as const },
      { name: "Observability", years: "4", level: "Intermediate" as const },
    ],
  },
  {
    title: "Orchestration, quality & governance",
    rows: [
      { name: "Databricks Jobs", years: "3", level: "Intermediate" as const },
      { name: "Snowflake Tasks", years: "2", level: "Intermediate" as const },
      { name: "Data quality", years: "4", level: "Intermediate" as const },
      { name: "Unity Catalog", years: "2", level: "Beginner" as const },
      { name: "Dagster", years: "1", level: "Exposure" as const },
      { name: "Prefect", years: "1", level: "Exposure" as const },
    ],
  },
  {
    title: "BI, metrics & stakeholder handoff",
    rows: [
      { name: "Power BI", years: "3", level: "Advanced" as const },
      { name: "Tableau", years: "1", level: "Exposure" as const },
      { name: "Looker", years: "1", level: "Exposure" as const },
      { name: "Metabase", years: "2", level: "Advanced" as const },
      { name: "Agile / Scrum", years: "7+", level: "Advanced" as const },
    ],
  },
] as const;

const credentialChips = [
  "AWS Certified Cloud Practitioner",
  "Astronomer Certification — Apache Airflow Fundamentals",
  "Fullstack Labs Certified — Data Engineer",
] as const;

const profileParagraphs = [
  <>
    Data Engineer and Analytics Engineer with 7+ years of experience turning operational and business data into reliable,
    scalable analytics. Strong SQL practice, cloud platforms (AWS, Azure, GCP), and production ETL/ELT design. Hands-on with{" "}
    <strong className="text-foreground">Snowflake</strong>, <strong className="text-foreground">Databricks</strong>, and Spark
    (PySpark); practical experience with data lake and data warehouse architectures. Emphasis on performance, observability, and
    maintainable pipelines.
  </>,
  <>
    Comfortable translating business rules into data models, collaborating in Agile Scrum teams, and communicating results to
    technical and non-technical stakeholders. Driven by automation, clear metrics, and measurable impact.
  </>,
] as const;

const coreCompetencies = [
  {
    title: "Warehouse & cloud",
    body:
      "Snowflake (warehousing patterns, tasks, sharing); AWS (S3, Glue, Redshift, Athena); Azure (Databricks, Data Factory, DevOps); GCP (BigQuery).",
  },
  {
    title: "Pipelines & orchestration",
    body:
      "ELT/ETL in production; dbt-style modular transforms and tests; Airflow; CI/CD; observability, retries, and idempotent loads.",
  },
  {
    title: "Modeling & SQL",
    body: "Dimensional modeling, grain discipline, incremental loads, advanced SQL for analytics and troubleshooting.",
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

const languages = [
  "English — native or bilingual proficiency",
  "Portuguese — native or bilingual proficiency",
  "Spanish — limited working proficiency",
] as const;

type CvExperienceRole = {
  org: string;
  title: string;
  period: string;
  /** One line under **Project:** (organization context). */
  projectLine: string;
  location?: string;
  ledes?: readonly string[];
  bullets: readonly string[];
  tags: readonly string[];
};

const experienceRoles: CvExperienceRole[] = [
  {
    org: "Tarmac.IO",
    title: "Senior Data Engineer",
    period: "May 2025 — present",
    location: "Remote",
    projectLine:
      "Tarmac.IO — embedded programs in logistics (inventory, routes, medallion marts) and healthcare (Databricks Lakehouse, DLT, compensation analytics, governance).",
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
    tags: ["dbt", "Databricks", "Snowflake", "DLT", "Terraform"],
  },
  {
    org: "AB InBev",
    title: "Data Engineer",
    period: "Aug 2023 — May 2025",
    projectLine:
      "AB InBev — The Loop Hub: global sales, marketing, and operations KPIs on a Databricks and Snowflake lakehouse with factory-style reusable pipelines.",
    ledes: [
      "The Loop Hub. Centralized platform for global sales, marketing, and operations: standardized KPIs and decisions. Lakehouse on Databricks and Snowflake; scalable models and near real-time analytics. Factory-style ETL pattern for modular, reusable pipelines across domains.",
    ],
    bullets: [
      "Requirements analysis, business rules, and structures for a unified analytics environment.",
      "ETL in Databricks and Snowflake; Spark integrations; Azure Data Factory and Azure DevOps for reliability.",
      "Agile Scrum with multidisciplinary teams; clear communication of results and blockers.",
    ],
    tags: ["Databricks", "Snowflake", "Factory ETL", "Global KPIs"],
  },
  {
    org: "Banco Bari",
    title: "Data Engineer",
    period: "Jan 2022 — Sep 2023",
    location: "Curitiba, PR",
    projectLine:
      "Banco Bari — enterprise banking analytics on AWS (S3, Glue, Athena, Redshift) with high-volume ETL and self-serve access for finance and operations.",
    ledes: [
      "Modern banking analytics platform: internal and external financial sources on AWS (S3, Glue, Athena, Redshift). ETL for scalable processing, reliable ingestion, and performance on large datasets; improved accessibility for financial and operational teams.",
    ],
    bullets: [
      "ETL with AWS (S3, Athena, EC2, EKS, ECR, Redshift, Glue); advanced SQL.",
      "Apache Airflow DAGs for reliability and observability; Agile planning and delivery.",
    ],
    tags: ["AWS", "Glue", "Redshift", "Airflow"],
  },
  {
    org: "Banco Bari",
    title: "Senior Data Analyst",
    period: "Dec 2020 — Dec 2021",
    location: "Curitiba, PR",
    projectLine: "Banco Bari — KPIs, dashboards, and analytical support for internal business units (Curitiba, PR).",
    bullets: [
      "Dashboards and KPIs for business units; Power BI, SQL, AWS Athena, Power Query M, Python.",
      "Exploratory analysis, metric definition for objectives, and stronger data culture across areas.",
    ],
    tags: ["Power BI", "SQL", "Athena", "Python"],
  },
  {
    org: "Banco Bari",
    title: "Project Analyst",
    period: "Aug 2019 — Dec 2020",
    location: "Curitiba and region, Brazil",
    projectLine: "Banco Bari — IT outsourcing portfolio: scope, budget, suppliers, and contractual governance.",
    bullets: [
      "Outsourcing and IT projects: scope, budget, planning, risk, status reporting, and contractual compliance.",
      "Phases, estimates, supplier payments, negotiations, and third-party contracts.",
    ],
    tags: ["Projects", "Agile context"],
  },
  {
    org: "Groupe Renault (Segula Technologies)",
    title: "Process Analyst",
    period: "Mar 2019 — Aug 2019",
    location: "Curitiba, Paraná",
    projectLine: "Groupe Renault via Segula Technologies — CAPEX/OPEX and investment control for vehicle capacity programs.",
    bullets: [
      "Project financial control (investments vs expenses); CAPEX/OPEX on vehicle capacity programs (large financial volumes).",
      "Stakeholder coordination, budgets aligned to strategy, and reporting to management.",
    ],
    tags: ["Finance", "CAPEX/OPEX"],
  },
  {
    org: "Bradesco Seguros",
    title: "Project Analyst",
    period: "Aug 2016 — Aug 2018",
    location: "Curitiba and region, Brazil",
    projectLine: "Bradesco Seguros — BIA (Business Intelligence Analytics) delivery for social-security programs.",
    bullets: [
      "BIA — Business Intelligence Analytics (social security): MS Project, reduced delivery timeline, milestone reporting.",
      "Risk management, integrated testing, partnerships with business areas, process definition support.",
    ],
    tags: ["MS Project", "BIA"],
  },
  {
    org: "HSBC",
    title: "Process Analyst",
    period: "May 2014 — Aug 2016",
    location: "Curitiba and region, Brazil",
    projectLine: "HSBC — process improvement, controls, SLA compliance, and documentation in a regulated banking environment.",
    bullets: [
      "Process improvement, root-cause analysis, tools for control and management, SLA compliance.",
      "Benchmarks, process documentation to standards.",
    ],
    tags: ["Banking", "Process", "SLA"],
  },
];

const jdMapping = [
  {
    Icon: Target,
    ask: "Design, scale, and optimize Snowflake-centric pipelines and marts",
    proof:
      "Own the middle: requirements workshops, metric grain, naming, and dbt or SQL models on Snowflake or Databricks before dashboards, at Tarmac.IO (healthcare compensation, logistics), AB InBev global KPIs, and Banco Bari banking analytics.",
  },
  {
    Icon: GitBranch,
    ask: "Reusable transforms + tests (dbt or equivalent discipline)",
    proof:
      "Production dbt with Snowflake and Databricks; medallion patterns; factory-style reusable pipelines at AB InBev. I default to gating releases with tests, documented contracts, and lineage.",
  },
  {
    Icon: BarChart3,
    ask: "Curated hand-off for analytics consumers (semantic mindset)",
    proof:
      "Shipped dashboards and reporting packs in Power BI; here the /api/metrics contract and dashboard route mimic the boundary you would get from a governed semantic layer before any specific BI tool: versionable, safe for analysts.",
  },
  {
    Icon: Zap,
    ask: "Ownership under constraints (cost, performance, compliance)",
    proof:
      "Snowflake and Databricks in production; Spark/PySpark; Airflow; and enterprise delivery patterns. I prioritize cost and reliability, not only feature velocity.",
  },
  {
    Icon: ShieldCheck,
    ask: "Regulated-industry discipline (including HSBC)",
    proof:
      "HSBC (May 2014–Aug 2016) as Process Analyst: process improvement, root-cause analysis, SLA compliance, and documentation in a regulated banking environment. Same rigor today when auditability, access control, and change management matter in data platforms.",
  },
] as const;

export function CvContent() {
  return (
    <div
      id="cv-document"
      className="cv-document mx-auto max-w-6xl space-y-12 px-0.5 sm:space-y-14 sm:px-0"
    >
      <section className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-white via-cyan-50/50 to-white px-7 py-10 shadow-xl shadow-primary/10 ring-1 ring-primary/10 sm:px-11 sm:py-12 print:border print:shadow-none print:ring-0">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl print:hidden"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/5 blur-2xl print:hidden"
          aria-hidden
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {PDF_TAGLINE}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-[2.75rem] md:leading-tight">
              Murilo Biss
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base print:hidden">
              <strong className="text-foreground">Download CV (PDF)</strong> generates the same layout you see here (not a browser
              screenshot). Other routes on this site are portfolio demos only.
            </p>
            <div className="hidden text-sm leading-relaxed text-foreground print:block">
              Murilo Biss · {PDF_TAGLINE}. Contact details in the column to the right.
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1 print:hidden" data-pdf-hide="true">
              <a
                href={CV_PDF_API}
                className={cn(buttonVariants(), "gap-2 shadow-md shadow-primary/25")}
              >
                <Download className="h-4 w-4" aria-hidden />
                Download CV (PDF)
              </a>
              <CvPrintButton variant="outline" className="border-primary/30 bg-white/90" />
              <Link href="/ai-lab" className={cn(buttonVariants({ variant: "outline" }), "border-primary/25 bg-white/90")}>
                <Wand2 className="h-4 w-4" aria-hidden />
                AI Lab
              </Link>
              <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "gap-1")}>
                Portfolio home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <aside className="flex w-full max-w-sm shrink-0 flex-col gap-3 sm:max-w-xs" aria-label="Highlights and contact">
            <div className="rounded-2xl border border-border/80 bg-white/90 px-4 py-4 text-center shadow-sm backdrop-blur-sm">
              <p className="font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">{YEARS_IN_DATA_KPI.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-foreground">{YEARS_IN_DATA_KPI.label}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{YEARS_IN_DATA_KPI.hint}</p>
            </div>
            <a
              href="mailto:murilobiss@gmail.com"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-sm shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 truncate font-medium text-foreground">murilobiss@gmail.com</span>
            </a>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-sm text-muted-foreground shadow-sm">
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>+55 (41) 99835-8844</span>
            </span>
            <a
              href="https://www.linkedin.com/in/murilobiss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-sm shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <Linkedin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 truncate">linkedin.com/in/murilobiss</span>
            </a>
            <a
              href="https://github.com/murilobiss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-sm shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <Github className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 truncate font-medium text-foreground">github.com/murilobiss</span>
            </a>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-sm text-muted-foreground shadow-sm">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              Brazil
            </span>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="summary-heading"
        className="rounded-3xl border border-border/90 bg-white p-7 shadow-md sm:p-9 lg:border-l-[5px] lg:border-l-primary lg:pl-10"
      >
        <h2 id="summary-heading" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <BarChart3 className="h-5 w-5" aria-hidden />
          </span>
          Professional profile
        </h2>
        {profileParagraphs.map((p, i) => (
          <p key={i} className={cn("text-sm leading-relaxed text-muted-foreground sm:text-base", i === 0 ? "mt-4" : "mt-3")}>
            {p}
          </p>
        ))}
      </section>

      <section aria-labelledby="comp-heading" className="space-y-5">
        <h2 id="comp-heading" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Database className="h-5 w-5" aria-hidden />
          </span>
          Core competencies
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {coreCompetencies.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border/90 bg-gradient-to-b from-white to-muted/25 p-5 shadow-sm sm:p-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-wide text-primary">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="skills-matrix-heading" className="w-full">
        <div className="rounded-3xl border border-border/90 bg-gradient-to-b from-white via-white to-muted/20 p-7 shadow-md sm:p-9 md:p-11">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3 text-primary">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                <Database className="h-6 w-6" aria-hidden />
              </span>
              <h2 id="skills-matrix-heading" className="text-lg font-semibold uppercase tracking-wide text-foreground sm:text-xl">
                Technical skills (years · level)
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Sections follow a résumé-style matrix: skill name, years of practice, then level (Exposure → Beginner → Intermediate →
            Advanced). Numbers are indicative, not a legal claim.
          </p>
          <div className="mt-9 grid gap-7 border-t border-foreground/10 pt-9 lg:grid-cols-2 xl:grid-cols-3">
            {skillMatrixSections.map((sec) => (
              <div
                key={sec.title}
                className="min-w-0 rounded-2xl border border-border/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6"
              >
                <p className="border-b border-foreground/10 pb-2.5 text-sm font-semibold text-foreground">{sec.title}</p>
                <div className="mt-3.5 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-2 gap-y-2 sm:gap-x-3">
                  {sec.rows.map((row) => (
                    <Fragment key={row.name}>
                      <span
                        className="min-w-0 truncate whitespace-nowrap text-[11px] leading-tight text-foreground sm:text-xs"
                        title={
                          row.name.includes("Athena")
                            ? "AWS Athena (Presto-compatible SQL)"
                            : row.name.startsWith("GE ")
                              ? "Great Expectations (data tests)"
                              : row.name
                        }
                      >
                        {row.name}
                      </span>
                      <span className="flex shrink-0 items-baseline justify-end gap-1 whitespace-nowrap tabular-nums">
                        <span className="text-[11px] text-muted-foreground sm:text-xs">{row.years}</span>
                        <span className="text-[9px] text-foreground/35 sm:text-[10px]" aria-hidden>
                          |
                        </span>
                        <span className="text-[9px] font-medium leading-none tracking-tight text-muted-foreground sm:text-[10px]">
                          {row.level}
                        </span>
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">Certifications</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {credentialChips.map((chip) => (
              <span
                key={chip}
                className="rounded-lg border border-emerald-700/20 bg-emerald-50/90 px-3 py-1.5 text-[11px] font-medium leading-snug text-foreground sm:text-xs"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="certs-heading" className="rounded-3xl border border-border/90 bg-white p-7 shadow-md sm:p-9">
        <h2 id="certs-heading" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Award className="h-5 w-5" aria-hidden />
          </span>
          Certifications
        </h2>
        <ul className="mt-5 list-inside list-disc space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lang-heading" className="rounded-3xl border border-border/90 bg-white p-7 shadow-md sm:p-9">
        <h2 id="lang-heading" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Languages className="h-5 w-5" aria-hidden />
          </span>
          Languages
        </h2>
        <ul className="mt-5 list-inside list-disc space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {languages.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="roles-heading" className="space-y-5">
        <h2 id="roles-heading" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Zap className="h-5 w-5" aria-hidden />
          </span>
          Professional experience
        </h2>
        <div className="divide-y divide-border/80 rounded-3xl border border-border/90 bg-white p-6 shadow-md sm:p-9 sm:text-[15px]">
          {experienceRoles.map((r) => {
            const responsibilities = [...(r.ledes ?? []), ...r.bullets];
            const tech = r.tags.length > 0 ? `${r.tags.join(", ")}.` : "";
            return (
              <article key={`${r.org}-${r.title}-${r.period}`} className="break-inside-avoid py-8 first:pt-0 last:pb-0">
                <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {r.org}
                  {r.location ? ` · ${r.location}` : ""}
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-foreground">
                  <strong className="font-semibold">Project:</strong> {r.projectLine}
                </p>
                <p className="mt-4 text-[15px] font-semibold text-foreground">Responsibilities:</p>
                {responsibilities.map((para, idx) => (
                  <p key={`${r.org}-resp-${idx}`} className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
                {tech ? (
                  <p className="mt-5 text-[15px] leading-relaxed text-foreground">
                    <strong className="font-semibold">Technologies:</strong> {tech}
                  </p>
                ) : null}
                <p className="mt-4 text-[15px] text-foreground">
                  <strong className="font-semibold">Duration:</strong> {r.period}.
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="how-operate-heading" className="space-y-5 print:break-inside-avoid">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="how-operate-heading" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Target className="h-5 w-5" aria-hidden />
              </span>
              How I operate
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Hiring-manager lens on delivery style; roles and dates are in Professional experience above.
            </p>
          </div>
          <span data-pdf-hide="true">
            <Link
              href="/infrastructure?section=infrastructure"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline print:hidden"
            >
              See infrastructure →
            </Link>
          </span>
        </div>
        <div className="space-y-4">
          {jdMapping.map(({ Icon, ask, proof }, i) => (
            <div
              key={ask}
              className="relative overflow-hidden rounded-2xl border border-border/90 bg-gradient-to-br from-white to-muted/15 p-6 shadow-sm transition hover:border-primary/20 hover:shadow-md sm:p-7 print:shadow-none"
            >
              <div
                className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-primary to-cyan-400 print:hidden"
                aria-hidden
              />
              <div className="flex flex-wrap items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary print:hidden">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-xs font-bold text-muted-foreground print:hidden">0{i + 1}</span>
                  <h3 className="mt-1 text-base font-semibold leading-snug text-foreground sm:text-lg print:mt-0">{ask}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{proof}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        data-pdf-hide="true"
        className="rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-cyan-50/80 to-primary/5 px-6 py-6 text-center text-sm leading-relaxed text-muted-foreground print:hidden"
      >
        <p>
          <strong className="text-foreground">PDF</strong> is generated from this page via{" "}
          <a href={CV_PDF_API} className="font-medium text-primary underline-offset-4 hover:underline">
            Download CV (PDF)
          </a>
          . Optional static copy:{" "}
          <a href={CV_PDF_HREF} className="font-medium text-primary underline-offset-4 hover:underline">
            cv-murilo-biss.pdf
          </a>
          . Explore the case:{" "}
          <Link href="/infrastructure" className="font-medium text-primary underline-offset-4 hover:underline">
            Infrastructure
          </Link>
          ,{" "}
          <Link href="/ai-lab" className="font-medium text-primary underline-offset-4 hover:underline">
            AI Lab
          </Link>
          , and{" "}
          <Link href="/dashboard" className="font-medium text-primary underline-offset-4 hover:underline">
            dashboards
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}

