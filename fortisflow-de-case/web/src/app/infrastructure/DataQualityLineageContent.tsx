"use client";

import Link from "next/link";
import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const qualityTab: TabItem = {
  id: "dq",
  label: "Data quality",
  content: (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Quality is layered: cheap checks at ingest, statistical checks in staging, semantic tests at the mart, and consumer
        contract tests at the API. Fail fast where correction is cheap; quarantine where you must preserve evidence.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Dimensions of quality</CardTitle>
            <CardDescription className="text-xs">What “good” means in code</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-xs leading-relaxed text-muted-foreground">
              <div>
                <dt className="font-medium text-foreground">Completeness</dt>
                <dd>Expected row volumes, null rates per column, referential presence after joins.</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Accuracy</dt>
                <dd>Reconciliation to source totals, business rules (e.g. tax bands), cross-system keys.</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Consistency</dt>
                <dd>Same grain and definitions across marts; SCD behavior documented and tested.</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Timeliness</dt>
                <dd>SLA per mart, lag from source event to curated availability, task duration trends.</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tests in practice</CardTitle>
            <CardDescription className="text-xs">dbt + beyond</CardDescription>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5 marker:text-primary">
              <li>
                <code className="text-foreground">unique</code> / <code className="text-foreground">relationships</code> /{" "}
                <code className="text-foreground">accepted_values</code> on promoted models.
              </li>
              <li>Custom tests for slowly changing dimensions and snapshot drift.</li>
              <li>Great Expectations or SQL assertions on landing when vendors change shape silently.</li>
              <li>Contract tests on <code className="text-foreground">/api/metrics</code> JSON so UI never ships against a broken slice.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Quarantine &amp; replay</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Bad batches land in a prefix or side table with <code className="text-foreground">batch_id</code> and reason code;
          downstream tasks skip poisoned ids. Replay is a documented playbook: re-run bronze→gold with the corrected extract,
          invalidate caches, notify consumers. Same pattern supports audit requests without ad-hoc copies of production.
        </CardContent>
      </Card>
    </div>
  ),
};

const lineageTab: TabItem = {
  id: "lineage",
  label: "Lineage & catalog",
  content: (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Lineage answers “what breaks if I change this column?” and “where did this KPI come from?” — it should be queryable by
        engineers and analysts, not trapped in a diagram from last year’s workshop.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Column-level lineage</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Prefer automatic extraction from dbt manifest + warehouse query logs where available. For hand-off to compliance,
            annotate sensitive columns (PII, revenue) with policy links. Impact analysis before renames: list downstream models,
            dashboards, and API fields.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Business metadata</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Glossary entries tied to physical tables: metric definition, owner, freshness SLA, and known caveats. Keeps “single
            source of truth” honest — the warehouse is not enough without prose humans actually read.
          </CardContent>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground">
        Narrative on metric ownership and contracts:{" "}
        <Link href="/source-of-truth" className="text-primary underline-offset-4 hover:underline">
          Source of truth
        </Link>
        .
      </p>
    </div>
  ),
};

const observabilityTab: TabItem = {
  id: "observe",
  label: "Observability",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Signals worth paging on</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1.5 marker:text-primary">
            <li>Freshness: latest <code className="text-foreground">_loaded_at</code> older than SLA.</li>
            <li>Volume: row counts outside rolling bands (missing feed vs duplicate load).</li>
            <li>Duration: p95 job time up after a code change — early regression detector.</li>
            <li>Data quality test failures on main branch or on scheduled production runs.</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Dashboards for data teams</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Separate operational dashboards from business KPIs: pipeline health, queue depth, error taxonomy, and warehouse credit
          burn by team. Reduces noise for executives while giving engineers a single place to debug.
        </CardContent>
      </Card>
    </div>
  ),
};

const tabs: TabItem[] = [qualityTab, lineageTab, observabilityTab];

export function DataQualityLineageContent() {
  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Dedicated view on <strong className="text-foreground">data quality</strong>,{" "}
        <strong className="text-foreground">lineage</strong>, and how they connect to catalogs, SLAs, and on-call reality —
        complementary to the pipeline tabs and the{" "}
        <Link href="/source-of-truth" className="text-primary underline-offset-4 hover:underline">
          Source of truth
        </Link>{" "}
        route.
      </p>
      <TabPanel tabs={tabs} ariaLabel="Data quality and lineage" />
    </div>
  );
}
