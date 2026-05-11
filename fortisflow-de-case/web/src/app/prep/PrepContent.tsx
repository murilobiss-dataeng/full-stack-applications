import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ClipboardList,
  Cloud,
  Gauge,
  Layers,
  Lock,
  MessageSquare,
  Shield,
  Target,
  Users,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_MARKETPLACE_BRAND } from "@/config/branding";

export function PrepContent() {
  return (
    <div className="space-y-10">
      <PageHeader
        kicker="Interview preparation"
        title="Project Manager call · Senior Data Engineer"
        description="One-hour technical and experience conversation. This page maps the role (Sigma Software, full remote, international client) to concrete themes you can steer toward: Snowflake optimization, warehouse design, data quality, and governance in a regulated posture."
      />

      <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Disclosure:</strong> {DEMO_MARKETPLACE_BRAND} is a{" "}
        <em>fictional</em> enterprise program used only to structure this portfolio site. It does not name or represent Sigma’s
        end customer. Sigma Software is referenced here only as the hiring organization you are in process with.
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary" aria-hidden />
              Organization & role
            </CardTitle>
            <CardDescription className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">Sigma Software</strong> · international IT services, 20+ years, full-remote
                hiring.
              </p>
              <p>
                <strong className="text-foreground">Role:</strong> Senior Data Engineer — allocation to an enterprise client
                (squad-style delivery, defined stack, PM-led process).
              </p>
              <p>
                <strong className="text-foreground">Commercial:</strong> budget band already validated with you (gross monthly
                cap discussed and accepted), which removes the main blocker to proceed if technical fit holds.
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Cloud className="h-4 w-4 text-primary" aria-hidden />
              Core stack (what to anchor stories on)
            </CardTitle>
            <CardDescription>Priority order mirrors the job description and PM screen.</CardDescription>
            <CardContent className="px-6 pb-6 pt-0">
              <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <strong className="text-foreground">High:</strong> Snowflake, advanced SQL, data warehousing, ELT, data
                  modeling.
                </li>
                <li>
                  <strong className="text-foreground">Medium:</strong> dbt (valued), Python (optional but useful).
                </li>
                <li>
                  <strong className="text-foreground">Delivery:</strong> Jira, Agile / sprints.
                </li>
              </ul>
            </CardContent>
          </CardHeader>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Target className="h-5 w-5 text-primary" aria-hidden />
          What they optimize for (lead with this)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Gauge,
              title: "Snowflake optimization",
              body: "Performance, cost efficiency, security — clustering / pruning mindset, query patterns, warehouse sizing, controlling compute, RBAC, least privilege, secure shares and stages.",
            },
            {
              icon: Layers,
              title: "Data warehouse design",
              body: "Analytical tables, scalability, bronze / silver / gold (or equivalent), reusable pipelines, clear grain and conformed dimensions.",
            },
            {
              icon: CheckCircle2,
              title: "Data quality",
              body: "Validations, tests (e.g. dbt tests), observability, integrity controls, monitoring on freshness and volume.",
            },
            {
              icon: Users,
              title: "Stakeholders",
              body: "Product, analytics, engineering — clear communication, autonomy, business understanding.",
            },
            {
              icon: Shield,
              title: "Regulated client lens",
              body: "Hypothesis: industrial / security-products context → emphasize auditability, lineage, governance, reliability, and access control without speculating beyond what you know.",
            },
            {
              icon: MessageSquare,
              title: "Ownership",
              body: "Independent, hands-on, proactive — you unblock ingestion-to-mart paths with minimal supervision.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">{body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <ClipboardList className="h-5 w-5 text-primary" aria-hidden />
          Likely deep-dives (have 2 examples each)
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Snowflake</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Partitioning / clustering keys, micro-partition pruning, reducing scans, result caching, warehouse auto-suspend,
              scaling policies, roles and row access policies, masking, separation of dev / prod workloads, pipeline
              idempotency and incremental models.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Advanced SQL</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Complex joins, window functions, CTEs, deduplication strategies, incremental loads, debugging plan regressions,
              explain plans at a high level.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Architecture</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              How you model pipelines, organize layers, treat quality gates, integrate multiple sources with conflicting keys, and
              expose curated marts to analytics without sprawl.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wallet className="h-4 w-4 text-primary" aria-hidden />
              What helped reopen the process
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Public portfolio on Vercel, technical GitHub, proactive communication, and showing you can own delivery beyond a
              minimal brief. Keep tying answers to{" "}
              <strong className="text-foreground">evidence</strong> (repos, diagrams, this site) where appropriate.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lock className="h-4 w-4 text-primary" aria-hidden />
              Practical translation of the job
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              They need someone who can take messy sources, structure a reliable warehouse, optimize Snowflake spend and latency,
              ship analytics-ready datasets, and maintain quality under compliance pressure — with strong self-direction.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/data-pipeline"
          className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Snowflake &amp; ELT narrative →
        </Link>
        <Link
          href="/governance"
          className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Quality &amp; governance →
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Demo ops surface →
        </Link>
      </div>
    </div>
  );
}
