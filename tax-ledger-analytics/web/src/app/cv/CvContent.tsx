import Link from "next/link";
import { ArrowRight, Download, FileText, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DEMO_MARKETPLACE_BRAND } from "@/config/branding";

const CV_PDF_HREF = "/cv-murilo-biss.pdf";

const jdMapping = [
  {
    ask: "Translate tax / finance questions into governed marts and self-service",
    proof:
      "Own the middle: requirements workshops, metric grain, naming, and dbt/SQL models before BI — Tarmac.IO (healthcare compensation, logistics), AB InBev global KPIs, Banco Bari banking analytics. Stakeholders get Looker/Power BI on top of definitions I controlled.",
  },
  {
    ask: "dbt (or equivalent) as the default for reusable transforms and tests",
    proof:
      "Production dbt with Snowflake and Databricks; medallion patterns; factory-style reusable pipelines at AB InBev. This repo shows singular tests, relationship tests, and mart rollups the way an analytics team would gate a release.",
  },
  {
    ask: "Sigma / Looker-class experience: metrics catalog mindset",
    proof:
      "Shipped BI in Looker and Power BI in real roles; here the /api/metrics contract + dashboard pages mimic a semantic layer boundary — documented, versionable, and safe for analysts.",
  },
  {
    ask: "5+ years at scale: SQL depth, ETL, controls, independent prioritization",
    proof:
      "7+ years data roles; Senior Data Analyst background; Spark/PySpark 5+ years; Airflow certified; Agile with global teams. I default to tests, lineage, and clear ownership — what hiring managers expect from senior Analytics Engineering.",
  },
  {
    ask: "Work across Data Eng, tax, finance, and product without dropping detail",
    proof:
      "Embedded with product and engineering at Tarmac; cross-market alignment at AB InBev; Terraform/CI where relevant. I speak JIRA and backlog language while keeping grain and SLAs explicit.",
  },
] as const;

export function CvContent() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Analytics Engineering · application</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Murilo Biss</h1>
        <p className="text-lg text-muted-foreground">
          <strong className="font-medium text-foreground">Analytics Engineer</strong> (and hands-on Data Engineer where the
          stack demands it). I own the path from messy operational data to{" "}
          <strong className="font-medium text-foreground">named metrics, tested SQL, and analyst-ready surfaces</strong> —
          the profile you want for tax, finance, or marketplace analytics expansion.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href={CV_PDF_HREF}
            download
            className={cn(buttonVariants(), "inline-flex h-9 gap-2 px-4 text-sm")}
          >
            <Download className="h-4 w-4" aria-hidden />
            Download CV (PDF)
          </a>
          <a
            href={CV_PDF_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex h-9 gap-2 px-4 text-sm")}
          >
            <FileText className="h-4 w-4" aria-hidden />
            Open in new tab
          </a>
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-4 text-sm")}>
            Portfolio home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Contact</CardTitle>
          <CardDescription className="text-xs">As listed on the CV</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <a className="text-foreground underline-offset-4 hover:underline" href="mailto:murilobiss@gmail.com">
              murilobiss@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span className="text-foreground">+55 (41) 99835-8844</span>
          </p>
          <p className="flex items-center gap-2 sm:col-span-2">
            <Linkedin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <a
              className="text-foreground underline-offset-4 hover:underline"
              href="https://www.linkedin.com/in/murilobiss"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/murilobiss
            </a>
          </p>
          <p className="flex items-center gap-2 sm:col-span-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            Brazil · English & Portuguese (professional)
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/25 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">What you get when you hire me in Analytics Engineering</CardTitle>
          <CardDescription className="text-xs">The job, not the title on a business card</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            Someone who <strong className="text-foreground">writes the metric definitions with you</strong>, encodes them in
            versioned SQL/dbt, documents grain, and negotiates trade-offs with Data Engineering on ingestion — then trains
            finance and tax partners to self-serve without forked logic.
          </p>
          <p>
            I am not only a pipeline plumber; I am the person who makes sure{" "}
            <strong className="text-foreground">the number in the board deck matches the warehouse row</strong> and that we
            can explain why — including when the business is a high-volume marketplace like the fictional{" "}
            <strong className="text-foreground">{DEMO_MARKETPLACE_BRAND}</strong> scenario used in this portfolio (DoorDash-class
            ops, without using any real trademark).
          </p>
        </CardContent>
      </Card>

      <section aria-labelledby="jd-map-heading" className="space-y-4">
        <h2 id="jd-map-heading" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Role bar → how I already operate
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Strong Analytics Engineering teams care about semantic clarity, test coverage, and safe self-service. Below is a
          straight line from what you are hiring for to what I have shipped — plus this repo as a working sketch of how I
          structure the work.
        </p>
        <ul className="space-y-3">
          {jdMapping.map((row) => (
            <li key={row.ask}>
              <Card className="border-border/80">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-medium leading-snug text-foreground">{row.ask}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 pt-0 text-xs leading-relaxed text-muted-foreground">{row.proof}</CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="summary-heading" className="space-y-3">
        <h2 id="summary-heading" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Professional summary (from CV)
        </h2>
        <Card>
          <CardContent className="pt-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Seven-plus years moving from raw operational and financial data to{" "}
              <strong className="text-foreground">metrics people actually use in decisions</strong>. Stack: Python, SQL,
              Spark (PySpark), Databricks, Snowflake, AWS and Azure data services, Airflow, dbt,{" "}
              <strong className="text-foreground">Looker</strong> and <strong className="text-foreground">Power BI</strong>.
              I am comfortable owning the full analytics engineering slice — ingest contracts with DE, transforms and tests,
              documentation, and the BI hand-off — in Agile teams with global stakeholders.
            </p>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="roles-heading" className="space-y-3">
        <h2 id="roles-heading" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Selected roles
        </h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Tarmac.IO — Senior Data Engineer</strong> (May 2025–present): dbt, Snowflake,
            Databricks, Delta Live Tables, Terraform, healthcare and logistics data products.
          </li>
          <li>
            <strong className="text-foreground">AB InBev — Data Engineer</strong> (Aug 2023–May 2025): Lakehouse on
            Databricks + Snowflake; factory ETL patterns; global sales and marketing KPIs.
          </li>
          <li>
            <strong className="text-foreground">Banco Bari — Data Engineer / Senior Data Analyst</strong>: AWS data platform
            (Glue, Redshift, Athena), Airflow, advanced SQL, dashboards for banking and operations.
          </li>
        </ul>
      </section>

      <section aria-labelledby="certs-heading" className="space-y-3">
        <h2 id="certs-heading" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Certifications & education
        </h2>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          <li>Astronomer — Apache Airflow Fundamentals</li>
          <li>Fullstack Labs — Certified Data Engineer</li>
          <li>FIAP — Postgraduate Software Engineering (in progress, 2025–2026)</li>
          <li>PUCPR — Industrial Engineering</li>
        </ul>
      </section>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Full timeline and titles are in the PDF. This site exists to show{" "}
        <strong className="text-foreground">how an Analytics Engineer structures work</strong>: contracts, transforms,
        tests, lineage thinking, and a governed metrics boundary before anyone opens a drag-and-drop chart.
      </p>
    </div>
  );
}
