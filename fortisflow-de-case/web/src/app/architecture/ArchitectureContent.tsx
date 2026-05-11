"use client";

import Link from "next/link";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const flowTab: TabItem = {
  id: "flow",
  label: "End-to-end",
  content: (
    <div className="space-y-5">
      <ArchitectureDiagram />
      <p className="text-sm leading-relaxed text-muted-foreground">
        Bronze → silver → gold: immutable raw, typed staging, curated entities, dbt marts, then a thin API for products.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="transition-colors hover:border-[hsl(217,33%,24%)]">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm">Ingestion</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              APIs + batch files land in S3 raw with batch IDs for replay and lineage.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="transition-colors hover:border-[hsl(217,33%,24%)]">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm">Serving</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Edge-friendly JSON from marts; see <code className="text-foreground">/api/metrics</code> for a mock payload.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  ),
};

const lakeTab: TabItem = {
  id: "lake",
  label: "Lake & ingest",
  content: (
    <div className="grid gap-3 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">APIs</CardTitle>
          <CardDescription className="text-sm">
            sigma-sec partner and OMS APIs push JSON into the raw zone. Idempotent writers avoid double-counting on webhook retries.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Batch files</CardTitle>
          <CardDescription className="text-sm">
            Parquet/JSON in S3 partitioned by ingest date and source. SFTP-style drops without blocking API traffic.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">AWS S3</CardTitle>
          <CardDescription className="text-sm">
            Versioned objects, encryption, lifecycle for cheap bronze. Locally mirrored under <code className="text-foreground">data/raw</code>.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

const computeTab: TabItem = {
  id: "compute",
  label: "Transform",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Python processing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="list-inside list-disc space-y-1.5">
            <li>Deterministic normalization before fuzzy matching.</li>
            <li>Similarity clustering + <code className="text-foreground">resolved_entity_id</code> with logged confidence.</li>
            <li>Validation failures short-circuit batches with structured logs.</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">dbt</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Models under <code className="text-foreground">src/dbt/models</code> with schema tests; CI runs{" "}
          <code className="text-foreground">dbt test</code> before promoting artifacts.
        </CardContent>
      </Card>
    </div>
  ),
};

const warehouseTab: TabItem = {
  id: "warehouse",
  label: "Warehouse & API",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">PostgreSQL</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Foreign keys across orders, hubs, and partners. Composite indexes (e.g. <code className="text-foreground">hub_id + placed_at</code>)
          avoid sequential scans on dashboard filters.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">API layer</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Next.js routes serve curated metrics while heavy SQL stays in the warehouse and dbt-built views.
        </CardContent>
      </Card>
    </div>
  ),
};

const economicsTab: TabItem = {
  id: "economics",
  label: "Startup tiers",
  content: (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Treat the stack as <strong className="text-foreground">progressive disclosure</strong>: ship with boring, cheap
        components first; swap orchestration or warehouse only when volume or compliance forces it.
      </p>
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tier A: MVP (&lt;$200/mo typical)</CardTitle>
            <CardDescription className="text-xs">Solo or tiny team, nightly batches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Lake:</span> S3 Intelligent-Tiering or a single bucket +
              lifecycle to Glacier for old bronze.
            </p>
            <p>
              <span className="font-medium text-foreground">Compute:</span> GitHub Actions on schedule + self-hosted runner
              only if minutes run out; otherwise laptop/cron VM.
            </p>
            <p>
              <span className="font-medium text-foreground">Warehouse:</span> Neon / Supabase / RDS{" "}
              <code className="text-foreground">db.t4g.micro</code>: smallest instance that fits working set.
            </p>
            <p>
              <span className="font-medium text-foreground">Observability:</span> structured logs to stdout → CloudWatch
              basic or free Grafana Cloud tier.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tier B: Product traction</CardTitle>
            <CardDescription className="text-xs">Hourly loads, a few concurrent analysts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Orchestration (pick one):</span>{" "}
              <strong className="text-foreground">Option 1</strong> EventBridge + Lambda step wrappers around the same Python
              entrypoints. <strong className="text-foreground">Option 2</strong> Prefect Cloud free tier / open-source
              worker on a small EC2. <strong className="text-foreground">Defer</strong> managed Airflow until recurring
              revenue covers it.
            </p>
            <p>
              <span className="font-medium text-foreground">Warehouse:</span> right-size RDS or move heavy read marts to
              read replica; keep writes on primary.
            </p>
            <p>
              <span className="font-medium text-foreground">CI:</span> parallel job: <code className="text-foreground">pytest</code>{" "}
              + <code className="text-foreground">dbt test</code> + optional containerized Postgres service for integration.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tier C: Scale-out</CardTitle>
            <CardDescription className="text-xs">Multi-tenant, SLAs, heavy BI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Lakehouse (optional):</span> Iceberg/Delta on S3 + Trino or
              warehouse-native external tables; only when cross-source SQL at lake scale beats egress costs.
            </p>
            <p>
              <span className="font-medium text-foreground">Separation:</span> dedicated ingestion accounts, row-level
              security in warehouse, contract APIs per tenant.
            </p>
            <p>
              <span className="font-medium text-foreground">DQ platform:</span> consider Great Expectations Cloud / Monte
              Carlo class tools when incident volume justifies subscription.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

const platformLadderTab: TabItem = {
  id: "platform-ladder",
  label: "Cloud options ($→$$$)",
  content: (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Same logical pipeline (bronze → silver → gold → warehouse → marts) can run on different clouds and price curves.
        Below is a <strong className="text-foreground">cheapest-first ladder</strong>; upgrade when data volume, team size,
        or compliance forces it, not before.
      </p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[720px] text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-foreground">
              <th className="px-3 py-2 font-medium">Relative cost</th>
              <th className="px-3 py-2 font-medium">Pattern</th>
              <th className="px-3 py-2 font-medium">When it wins</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-emerald-400/90">Lowest</td>
              <td className="px-3 py-2">Local disk or S3 + cron / GitHub Actions + Python on a small VM; Postgres managed free tier.</td>
              <td className="px-3 py-2">MVP, &lt; few GB/day, one engineer; this repo mirrors that spirit.</td>
            </tr>
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-emerald-400/90">Low</td>
              <td className="px-3 py-2">S3 + AWS Lambda / Step Functions + RDS; or GCP Cloud Run jobs + Cloud SQL.</td>
              <td className="px-3 py-2">Scheduled ETL, pay-per-invoke, minimal ops; still no Spark tax.</td>
            </tr>
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-amber-400/90">Mid</td>
              <td className="px-3 py-2">
                <strong className="text-foreground">AWS Glue</strong> (crawlers + PySpark jobs) +{" "}
                <strong className="text-foreground">Athena</strong> on curated Parquet/Iceberg; or{" "}
                <strong className="text-foreground">BigQuery</strong> external tables + scheduled queries.
              </td>
              <td className="px-3 py-2">Many small files, evolving schemas, catalog discovery; Glue catalog pays off.</td>
            </tr>
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-amber-400/90">Mid–high</td>
              <td className="px-3 py-2">
                <strong className="text-foreground">Amazon EMR</strong> (transient Spark) or self-managed Kubernetes Spark
                for bursty heavy transforms.
              </td>
              <td className="px-3 py-2">TB-scale joins / ML feature builds a few times per day; shut clusters when idle.</td>
            </tr>
            <tr className="border-b border-border/70">
              <td className="px-3 py-2 font-medium text-orange-400/90">High</td>
              <td className="px-3 py-2">
                <strong className="text-foreground">Databricks</strong> (Jobs + Delta Lake + Unity Catalog) or{" "}
                <strong className="text-foreground">Snowflake</strong> (tasks, streams, Snowpipe) as the analytical plane.
              </td>
              <td className="px-3 py-2">Many teams, unified batch+ML, strong governance SKU, SLA-heavy enterprise sales.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium text-red-400/80">Premium +</td>
              <td className="px-3 py-2">
                Databricks/Snowflake <span className="italic">plus</span> Fivetran / Matillion / observability (Monte Carlo
                class) + multi-region DR.
              </td>
              <td className="px-3 py-2">Regulated, multi-tenant, global footprint; executive sign-off once ARR supports fixed platform burn.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Governance tie-in:</strong> expensive platforms do not replace contracts; they
        automate enforcement. Pair any tier with{" "}
        <Link href="/source-of-truth" className="text-primary underline-offset-4 hover:underline">
          Metric truth
        </Link>{" "}
        so spend tracks risk.
      </p>
    </div>
  ),
};

const testCiTab: TabItem = {
  id: "test-ci",
  label: "Testing & CI",
  content: (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pipeline tests (Python)</CardTitle>
            <CardDescription className="text-xs">Fast feedback, no cloud dependency by default</CardDescription>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5">
              <li>
                <strong className="text-foreground">Unit:</strong> normalization, dedupe flags, merge rules; pure functions
                with fixtures (see <code className="text-foreground">tests/test_normalization.py</code> pattern).
              </li>
              <li>
                <strong className="text-foreground">Property-based (optional):</strong> Hypothesis on string normalizers to
                catch edge unicode.
              </li>
              <li>
                <strong className="text-foreground">Golden / snapshot:</strong> fixed raw JSON → assert curated JSON hash or
                stable sort; catches silent drift in entity resolution.
              </li>
              <li>
                <strong className="text-foreground">Idempotency:</strong> run the same batch_id twice; row counts and
                checksums unchanged.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Integration &amp; warehouse</CardTitle>
            <CardDescription className="text-xs">Optional in CI when budget allows minutes</CardDescription>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5">
              <li>
                <strong className="text-foreground">Docker Compose:</strong> Postgres service + load seed → run ETL → assert
                row counts and FK closure.
              </li>
              <li>
                <strong className="text-foreground">dbt:</strong> <code className="text-foreground">dbt build</code> on a
                slim CI schema; <code className="text-foreground">dbt test</code> for uniqueness, relationships, accepted_values.
              </li>
              <li>
                <strong className="text-foreground">Contract tests:</strong> consumer-driven JSON schema for{" "}
                <code className="text-foreground">/api/metrics</code> (e.g. Pydantic / openapi diff in CI).
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Data quality layers (economical default)</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ol className="list-inside list-decimal space-y-1.5">
            <li>
              <strong className="text-foreground">Cheap:</strong> dbt tests + SQL checks in staging (null rates, distinct
              keys, row count vs. prior run within tolerance).
            </li>
            <li>
              <strong className="text-foreground">Medium:</strong> Elementary (open source) on dbt for freshness and volume
              anomalies; Slack/webhook alerts.
            </li>
            <li>
              <strong className="text-foreground">Heavier:</strong> Great Expectations or vendor DQ; add when false-positive
              noise from (1)-(2) exceeds engineering time.
            </li>
          </ol>
          <p className="mt-3">
            <strong className="text-foreground">Quarantine pattern:</strong> failed rows land in{" "}
            <code className="text-foreground">raw/quarantine/</code> with error code; never silently drop; fixes replay
            from bronze.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

const aiTab: TabItem = {
  id: "ai",
  label: "AI (assistive)",
  content: (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        AI should <strong className="text-foreground">reduce human toil</strong>, not replace governance: keep deterministic
        rules as source of truth; use models for triage, wording, and similarity hints under policy.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Low-cost use cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Match review queue:</strong> LLM summarizes why two merchant profiles might
              match (evidence bullets); human approves merge; API costs bounded by queue depth + caching.
            </p>
            <p>
              <strong className="text-foreground">RAG on internal metadata:</strong> embeddings over dbt model docs + column
              descriptions + runbooks; analysts ask in natural language (no client PII in corpus).
            </p>
            <p>
              <strong className="text-foreground">DQ copilot:</strong> feed anonymized schema + failing row patterns to
              suggest fix SQL or upstream ticket text; optional, off by default in regulated contexts.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Options &amp; guardrails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Embeddings for similarity:</strong> small open models (e.g. sentence
              transformers) run batch on CPU for name/affiliation clustering; cache vectors in Postgres{" "}
              <code className="text-foreground">pgvector</code> when latency matters; cheaper than LLM per row at volume.
            </p>
            <p>
              <strong className="text-foreground">Vendor LLM:</strong> pay-per-token APIs with redaction pipeline (strip
              names/addresses before external call where required); store only structured decisions, not raw prompts with
              PII.
            </p>
            <p>
              <strong className="text-foreground">Later:</strong> fine-tune a small classifier on labeled merge pairs when
              you have thousands of examples; amortizes inference cost.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export function ArchitectureContent() {
  return (
    <TabPanel
      tabs={[
        flowTab,
        lakeTab,
        computeTab,
        warehouseTab,
        economicsTab,
        platformLadderTab,
        testCiTab,
        aiTab,
      ]}
      ariaLabel="Architecture sections"
    />
  );
}
