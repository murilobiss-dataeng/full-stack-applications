"use client";

import Link from "next/link";
import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const costTab: TabItem = {
  id: "cost",
  label: "Cost & compute",
  content: (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Pipeline design is spend design: every full scan, wide join, and idle warehouse minute shows up on the invoice. These are
        the levers I use when I own both the SQL and the warehouse policy.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Warehouse &amp; scheduling</CardTitle>
            <CardDescription className="text-xs">Right-size before tuning SQL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5 marker:text-primary">
              <li>Separate <strong className="text-foreground">interactive</strong> vs <strong className="text-foreground">batch</strong> warehouses; cap auto-suspend aggressively on ad-hoc.</li>
              <li>Stagger heavy dbt runs to avoid credit spikes; use task graphs instead of overlapping cron storms.</li>
              <li>Prefer incremental models + merge keys over nightly full refreshes when history allows.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Query shape</CardTitle>
            <CardDescription className="text-xs">Prune early, materialize once</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5 marker:text-primary">
              <li>Filter on partition/cluster keys before joins; avoid <code className="text-foreground">SELECT *</code> in staging promos.</li>
              <li>Push aggregations to the warehouse; keep orchestration thin — fewer round trips, clearer cost attribution.</li>
              <li>Cluster / sort keys aligned to the heaviest consumer queries (BI filters, API grain).</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Observability for cost</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Tag every job with <code className="text-foreground">domain</code>, <code className="text-foreground">pipeline</code>, and{" "}
          <code className="text-foreground">batch_id</code>; export warehouse query history weekly and review top 10 expensive
          statements. Pair with anomaly alerts when daily credits drift from baseline — often the first sign of a bad deploy or a
          missing predicate.
        </CardContent>
      </Card>
    </div>
  ),
};

const securityTab: TabItem = {
  id: "security",
  label: "Security in pipelines",
  content: (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Data pipelines are moving trust boundaries: credentials cross networks, raw payloads land before QC, and service accounts
        need the narrowest path that still lets jobs complete.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Identity &amp; paths</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5 marker:text-primary">
              <li>Federated OIDC from CI to cloud roles — no long-lived keys in Git.</li>
              <li>Scoped IAM: ingest service can write <code className="text-foreground">landing/vendor_x/*</code> only; cannot read marts.</li>
              <li>Encrypt in transit (TLS) and at rest (KMS); separate keys per environment.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Data in motion</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5 marker:text-primary">
              <li>Redact or tokenize PII at landing when possible; never log raw payloads.</li>
              <li>Row-level policies and masking on analyst paths; pipelines use technical roles without human broad access.</li>
              <li>Audit: who promoted which dbt tag, which task wrote to gold, tied to change tickets.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground">
        Role matrix and encryption notes also appear under{" "}
        <Link href="/infrastructure?section=infrastructure" className="text-primary underline-offset-4 hover:underline">
          Infrastructure → Quality &amp; governance
        </Link>
        .
      </p>
    </div>
  ),
};

const governanceTab: TabItem = {
  id: "governance",
  label: "Governance hooks",
  content: (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Governance is not a slide deck: it is enforceable gates in the same repo as the pipelines — contracts, approvals, and
        lineage that survive refactors.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm">Design-time</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Schema contracts in CI, breaking-change review for shared dimensions, documented owners per mart.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm">Run-time</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Quarantine bad batches, block promote on failed tests, emit lineage edges to the catalog on every deploy.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm">Consume-time</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Published APIs and BI layers read only curated schemas; assistants constrained to approved metrics contracts.
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Checklist before calling a pipeline “production”</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ol className="list-inside list-decimal space-y-1.5">
            <li>Idempotent loads and explicit backfill procedure.</li>
            <li>SLA + freshness alert with owner on-call.</li>
            <li>Rollback: previous dbt artifact + data retention for replay.</li>
            <li>Data classification tags propagated to the catalog.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  ),
};

const tabs: TabItem[] = [costTab, securityTab, governanceTab];

export function PerformanceContent() {
  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        How I approach <strong className="text-foreground">designing and optimizing data pipelines</strong> when the job is not only
        “make it green” but keep credits predictable, surfaces safe, and changes explainable.
      </p>
      <TabPanel tabs={tabs} ariaLabel="Pipeline performance topics" />
    </div>
  );
}
