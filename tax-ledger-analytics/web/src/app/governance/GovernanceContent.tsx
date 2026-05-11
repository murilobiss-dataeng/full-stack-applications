"use client";

import Link from "next/link";
import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const executiveTab: TabItem = {
  id: "exec",
  label: "Executive charter",
  content: (
    <div className="space-y-5">
      <figure className="rounded-xl border border-primary/30 bg-primary/5 px-5 py-4">
        <blockquote className="text-center text-base font-medium leading-snug text-foreground sm:text-lg">
          Each dataset has an owner and a defined contract.
        </blockquote>
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          Non-negotiable for audit-ready <strong className="text-foreground">finance and tax</strong> analytics: before
          tools, before dashboards.
        </figcaption>
      </figure>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            t: "Defensible decisions",
            d: "Policies are written, versioned, and tied to roles, not tribal knowledge in Slack threads.",
          },
          {
            t: "Predictable spend",
            d: "Controls on who runs what (IAM), where heavy SQL runs (warehouse vs lake), and when alerts fire.",
          },
          {
            t: "Velocity without chaos",
            d: "Clear contracts let product ship fast; lineage and tests prove nothing broke in the dark.",
          },
        ].map((x) => (
          <Card key={x.t}>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm">{x.t}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-muted-foreground">{x.d}</CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        For warehouse and ingestion patterns ordered from lean to premium, see your platform docs or internal architecture
        standards. For merge rules and conflict resolution in this portfolio, see{" "}
        <Link href="/source-of-truth?section=truth" className="text-primary underline-offset-4 hover:underline">
          Truth &amp; lineage → Source of truth
        </Link>
        . For Terraform, Docker, and CI OIDC patterns, open the <strong className="text-foreground">Infra as code</strong> tab
        below and the <code className="text-foreground">infra/</code> folder in the repo.
      </p>
    </div>
  ),
};

const securityTab: TabItem = {
  id: "security",
  label: "Security & IAM",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Identity &amp; least privilege</CardTitle>
          <CardDescription className="text-xs">Simulated roles for a real deployment posture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
          <div className="overflow-x-auto rounded-lg border border-border bg-muted/30 font-mono text-[11px]">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b border-border text-foreground">
                  <th className="px-3 py-2 font-medium">Role</th>
                  <th className="px-3 py-2 font-medium">Raw / bronze</th>
                  <th className="px-3 py-2 font-medium">Staging</th>
                  <th className="px-3 py-2 font-medium">Curated &amp; marts</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/60">
                  <td className="px-3 py-2 font-medium text-foreground">data_engineer</td>
                  <td className="px-3 py-2">Read/write (ingest, quarantine replay)</td>
                  <td className="px-3 py-2">Full</td>
                  <td className="px-3 py-2">Write marts + run dbt</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="px-3 py-2 font-medium text-foreground">analyst</td>
                  <td className="px-3 py-2">No access (or read-only masked)</td>
                  <td className="px-3 py-2">Read-only views</td>
                  <td className="px-3 py-2">Read curated + published marts only</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-foreground">pipeline_svc</td>
                  <td className="px-3 py-2">Scoped bucket prefix + KMS key</td>
                  <td className="px-3 py-2">ETL user only</td>
                  <td className="px-3 py-2">Upsert via stored proc / role-limited</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong className="text-foreground">Why analysts skip raw:</strong> vendor payloads may contain PII and
            pre-QC noise; curated tables carry classification tags and documented contracts.
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Secrets &amp; config</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Never hardcode</strong> DB passwords or API keys. Use AWS Secrets Manager,
            GCP Secret Manager, or Doppler, injected at runtime into the job environment. Separate secrets per env
            (dev/stage/prod) and rotate on joiners/leavers.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Encryption</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">At rest:</strong> S3 SSE-KMS or SSE-S3; Postgres TDE or disk encryption at
            cloud provider; backups encrypted. <strong className="text-foreground">In transit:</strong> TLS 1.2+ everywhere
            (JDBC, HTTPS to APIs, <code className="text-foreground">sslmode=require</code>).
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

const governanceTab: TabItem = {
  id: "governance",
  label: "Governance & contracts",
  content: (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Data ownership</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Every dataset names a <strong className="text-foreground">business owner</strong> (accountable for meaning)
            and a <strong className="text-foreground">technical steward</strong> (schema, SLAs, pipelines). RACI is
            published next to the contract so procurement and outside counsel know whom to call.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Classification</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong className="text-foreground">Public</strong>: aggregated stats safe for marketing (no individuals).
              </li>
              <li>
                <strong className="text-foreground">Internal</strong>: operational metrics; company VPN + SSO.
              </li>
              <li>
                <strong className="text-foreground">Sensitive</strong>: PII, matter details, financials; column masking,
                row-level security, audit log on select.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Data contracts &amp; schema versioning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
          <p>
            A <strong className="text-foreground">contract</strong> states: primary key, grain, freshness SLA, allowed
            null rates, breaking-change policy, and upstream contact. Version it in Git next to dbt (
            <code className="text-foreground">schema.yml</code>) and enforce with CI.
          </p>
          <p>
            <strong className="text-foreground">Schema versioning:</strong> additive changes ship freely; breaking changes
            require a new model version or parallel table (<code className="text-foreground">partners_v2</code>) with a
            deprecation window; never silent renames in prod.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

const lineageTab: TabItem = {
  id: "lineage",
  label: "Lineage & data quality",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">End-to-end lineage (DoorRush partner path)</CardTitle>
          <CardDescription className="text-xs">Where did the metric come from? Which transforms ran?</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
            {`raw_partner_feed.json (bronze)
    → normalize_record_fields
    → flag_duplicates
    → resolve_merchant_entities
    → partners_curated_*.json (gold-ready)
    → warehouse.partners (+ order_partner edges)
    → dbt: partner_metrics.sql / order_aggregations.sql
    → /api/metrics → DoorRush dashboard`}
          </pre>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            In production, capture <strong className="text-foreground">batch_id + git SHA + dbt manifest</strong> in run
            metadata so every dashboard point traces to code + data snapshot (OpenLineage-compatible pattern).
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Data quality: dbt-style seriousness</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>
              <strong className="text-foreground">Validation rules:</strong> accepted_values on status enums; regex or
              range checks on dates.
            </li>
            <li>
              <strong className="text-foreground">Null checks:</strong> <code className="text-foreground">not_null</code> on
              keys and regulator-required fields.
            </li>
            <li>
              <strong className="text-foreground">Uniqueness:</strong> <code className="text-foreground">unique</code> on{" "}
              <code className="text-foreground">resolved_entity_id</code> in curated marts.
            </li>
            <li>
              <strong className="text-foreground">Referential integrity:</strong>{" "}
              <code className="text-foreground">relationships</code> to hubs and orders.
            </li>
            <li>
              <strong className="text-foreground">Freshness:</strong> dbt source <code className="text-foreground">loaded_at_field</code>{" "}
              + threshold alerts when bronze stops arriving.
            </li>
            <li>
              <strong className="text-foreground">Volume anomalies:</strong> row count vs trailing median; Elementary or
              custom SQL in staging.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  ),
};

const observabilityTab: TabItem = {
  id: "obs",
  label: "Observability & orchestration",
  content: (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Structured logs &amp; metrics</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Emit JSON lines: <code className="text-foreground">batch_id</code>, <code className="text-foreground">stage</code>,{" "}
            <code className="text-foreground">duration_ms</code>, <code className="text-foreground">rows_in</code>,{" "}
            <code className="text-foreground">rows_out</code>, <code className="text-foreground">error_code</code>. Ship to
            CloudWatch / Datadog / Grafana Loki. Dashboard SLO: p95 job duration, failure rate, freshness lag.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Alerts (even if mocked first)</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Start with a <strong className="text-foreground">Slack webhook</strong> on DQ failure or job error. Escalation:
            page on-call only for curated publish failures (customer-facing). Mock alert in dev proves wiring before you pay
            for paging vendors.
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Orchestration: Airflow mental model</CardTitle>
          <CardDescription className="text-xs">No need to run Airflow on day one; the concepts still govern design</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
          <p>
            A <strong className="text-foreground">DAG</strong> declares tasks and dependencies: e.g.{" "}
            <code className="text-foreground">ingest_raw</code> → <code className="text-foreground">normalize_partners</code>{" "}
            → <code className="text-foreground">resolve_entities</code> → <code className="text-foreground">load_warehouse</code>{" "}
            → <code className="text-foreground">dbt_run</code> → <code className="text-foreground">cache_warm</code>. Retries
            and backfills are scoped per task; idempotent tasks make replays safe.
          </p>
          <p>
            <strong className="text-foreground">Cheap orchestration:</strong> cron + Makefile / Step Functions.{" "}
            <strong className="text-foreground">Mid:</strong> Prefect or Dagster OSS. <strong className="text-foreground">Premium:</strong>{" "}
            MWAA / Composer / Astronomer when DAG count and SLAs justify fixed monthly cost.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

const versioningTab: TabItem = {
  id: "version",
  label: "Versioning & source of truth",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Version the pipeline, not only the app</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Tag releases (<code className="text-foreground">etl-v1.4.2</code>) and store them in run metadata. Pair with{" "}
          <strong className="text-foreground">dbt artifacts</strong> (manifest, catalog) per deploy. Rollbacks mean
          redeploying a known tag + optional warehouse migration down script.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Backfill strategy</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Partition by <code className="text-foreground">ingest_date</code> or <code className="text-foreground">source_batch_id</code>.
          Backfill replays bronze→gold for affected partitions only; <strong className="text-foreground">incremental models</strong> in
          dbt reduce warehouse cost. For tax audit holds, freeze partitions immutably; never overwrite evidence buckets.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Source of truth: merge &amp; conflicts</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Document <strong className="text-foreground">source priority</strong> (DoorRush internal master &gt; PSP &gt; scrape),
          survivorship rules, and human-in-the-loop for high-risk merges. Full detail:{" "}
          <Link href="/source-of-truth?section=truth" className="text-primary underline-offset-4 hover:underline">
            Source of truth
          </Link>
          .
        </CardContent>
      </Card>
    </div>
  ),
};

const performanceTab: TabItem = {
  id: "perf",
  label: "Performance & scale",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">PostgreSQL: index strategy</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1.5">
            <li>
              <strong className="text-foreground">B-Tree</strong> on equality/range predicates (
              <code className="text-foreground">hub_id</code>, <code className="text-foreground">placed_at</code>, foreign keys used in joins).
            </li>
            <li>
              <strong className="text-foreground">GIN / pg_trgm</strong> for fuzzy merchant name search; only where
              needed; index size and write amplification trade off against ad-hoc search latency.
            </li>
            <li>
              <strong className="text-foreground">Partial indexes</strong> for hot subsets (e.g. in-flight orders only).
            </li>
            <li>
              Run <code className="text-foreground">EXPLAIN (ANALYZE, BUFFERS)</code> on top dashboard queries; fix seq scans
              before buying bigger hardware.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Scalability patterns</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1.5">
            <li>
              <strong className="text-foreground">Batch vs streaming:</strong> DoorRush marketplace feeds are mostly batch; introduce
              streaming (Kafka + consumer) only for near-real-time SLA or fraud alerts when revenue covers ops burden.
            </li>
            <li>
              <strong className="text-foreground">Partitioning:</strong> large fact tables by day or hub; attach
              and detach partitions for cheap archival.
            </li>
            <li>
              <strong className="text-foreground">Incremental loads:</strong> watermark on <code className="text-foreground">updated_at</code>; merge
              (upsert) instead of full table scans.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Developer experience</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Monorepo layout (<code className="text-foreground">data-platform</code> + <code className="text-foreground">web</code>), Makefile or
          task runner, one-command local run, fast <code className="text-foreground">pytest</code>, pre-commit for format/lint. Clear ownership of
          folders = faster onboarding and fewer production foot-guns.
        </CardContent>
      </Card>
    </div>
  ),
};

const infraIacTab: TabItem = {
  id: "infra",
  label: "Infra as code",
  content: (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        The monorepo now includes a small <strong className="text-foreground">infra/</strong> folder: Terraform stubs, a local{" "}
        <code className="text-foreground">docker-compose.yml</code> for Postgres, and a sample{" "}
        <code className="text-foreground">Dockerfile.pipeline</code> for batch jobs. Treat it as a blueprint; wire providers,
        backends, and modules to your org standard.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Terraform</CardTitle>
            <CardDescription className="text-xs">S3 + KMS + IAM roles (commented)</CardDescription>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <code className="text-foreground">infra/terraform/main.tf</code> holds a minimal root module;{" "}
            <code className="text-foreground">iam-outline.tf</code> lists permission boundaries for{" "}
            <code className="text-foreground">pipeline_svc</code> vs humans. Use remote state (S3 + Dynamo lock) before team
            collaboration.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Containers</CardTitle>
            <CardDescription className="text-xs">Reproducible ETL runtime</CardDescription>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Build the Python package into an image for <strong className="text-foreground">ECS Fargate</strong>,{" "}
            <strong className="text-foreground">Cloud Run jobs</strong>, or <strong className="text-foreground">Kubernetes CronJobs</strong>. Same
            artifact from CI → lower &quot;works on my machine&quot; risk.
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">CI/CD &amp; OIDC</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Prefer <strong className="text-foreground">GitHub Actions OIDC → AWS IAM role</strong> over long-lived access keys for
          <code className="text-foreground">terraform plan/apply</code> and ECR pushes. Separate roles: <code className="text-foreground">ci-plan</code> (read) vs{" "}
          <code className="text-foreground">ci-apply</code> (write, protected branches only).
        </CardContent>
      </Card>
    </div>
  ),
};

const costTab: TabItem = {
  id: "cost",
  label: "Cost scenarios",
  content: (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Figures are <strong className="text-foreground">indicative order-of-magnitude</strong> for a small team in a major
        cloud region (storage + modest compute + one small warehouse). Actuals depend on TB ingested, query concurrency, and
        reserved capacity; use them for planning conversations, not procurement quotes.
      </p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-foreground">
              <th className="px-3 py-2 font-medium">Profile</th>
              <th className="px-3 py-2 font-medium">Typical stack sketch</th>
              <th className="px-3 py-2 font-medium">Ballpark / month</th>
              <th className="px-3 py-2 font-medium">Strategic note</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-foreground">Lean</td>
              <td className="px-3 py-2">S3 + GitHub Actions + Neon/Supabase + free tier observability</td>
              <td className="px-3 py-2">$100–400</td>
              <td className="px-3 py-2">Prove product-market fit before platform tax.</td>
            </tr>
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-foreground">Growth</td>
              <td className="px-3 py-2">+ RDS multi-AZ small, Step Functions, Secrets Manager, read replica</td>
              <td className="px-3 py-2">$800–2.5k</td>
              <td className="px-3 py-2">Reliability and IAM maturity for paying customers.</td>
            </tr>
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-foreground">Lake ETL</td>
              <td className="px-3 py-2">+ AWS Glue jobs + Athena + curated Iceberg (selective)</td>
              <td className="px-3 py-2">$2k–8k</td>
              <td className="px-3 py-2">When file volume and schema drift automation beat bespoke Python ops.</td>
            </tr>
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-foreground">Premium analytics</td>
              <td className="px-3 py-2">Databricks Jobs + Delta + enterprise support OR Snowflake + Fivetran-class loads</td>
              <td className="px-3 py-2">$15k–60k+</td>
              <td className="px-3 py-2">Unified batch + ML + governance; justify with ARR and audit requirements.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Rule of thumb: <strong className="text-foreground">do not spend premium platform dollars until premium problems appear</strong>{" "}
        (multi-TB merges, strict SLAs, cross-team DAG sprawl, or regulated lineage). Until then, Postgres + dbt + rigorous
        contracts outperform an underused Databricks workspace on the {"P&L"}.
      </p>
    </div>
  ),
};

export function GovernanceContent() {
  return (
    <TabPanel
      tabs={[
        executiveTab,
        securityTab,
        governanceTab,
        lineageTab,
        observabilityTab,
        versioningTab,
        performanceTab,
        infraIacTab,
        costTab,
      ]}
      ariaLabel="Governance and operations"
    />
  );
}
