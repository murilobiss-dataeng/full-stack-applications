"use client";

import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dedupTab: TabItem = {
  id: "dedup",
  label: "Dedup",
  content: (
    <Card>
      <CardContent className="pt-5 text-sm leading-relaxed text-muted-foreground">
        Normalize (lowercase, trim, NFKC) before similarity. Union-find merges pairs above threshold; cluster-size logs
        surface threshold drift.
      </CardContent>
    </Card>
  ),
};

const mergeTab: TabItem = {
  id: "merge",
  label: "Merge rules",
  content: (
    <div className="grid gap-2 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Vendor precedence</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          Court-certified roster beats scraped directories; <code className="text-foreground">last_verified_at</code> breaks ties.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Survivorship</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          Prefer longest clean display names; never merge IDs without a shared hard key (e.g. bar number).
        </CardContent>
      </Card>
    </div>
  ),
};

const validationTab: TabItem = {
  id: "validation",
  label: "Validation",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Dimensions we enforce</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>
              <strong className="text-foreground">Accuracy / validity:</strong> bar numbers, date ranges, enum courts —
              reject impossible combinations early.
            </li>
            <li>
              <strong className="text-foreground">Completeness:</strong> required attributes per source contract; optional
              fields tracked as coverage metrics in the dashboard.
            </li>
            <li>
              <strong className="text-foreground">Uniqueness:</strong> staging keys + curated{" "}
              <code className="text-foreground">resolved_entity_id</code> uniqueness before mart publish.
            </li>
            <li>
              <strong className="text-foreground">Consistency:</strong> referential checks (case ↔ court ↔ lawyer bridge)
              in dbt; cross-table balance checks (e.g. sums of case fees vs. detail lines) when facts exist.
            </li>
            <li>
              <strong className="text-foreground">Timeliness:</strong> freshness SLA per source — alert if bronze ingest
              misses a window (cheap: query max(ingested_at) in CI or cron).
            </li>
            <li>
              <strong className="text-foreground">Bias / audit:</strong> log merge decisions with rule version + optional
              human reviewer id for high-risk matches (pairs AI suggestions with accountability).
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-5 text-sm text-muted-foreground">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Execution order</p>
          <ol className="list-inside list-decimal space-y-2 text-xs leading-relaxed">
            <li>Pipeline schema checks reject malformed batches.</li>
            <li>Staging distribution checks and anomaly tolerances (see Data pipeline → Data quality).</li>
            <li>dbt tests on uniqueness, relationships, and accepted values in marts.</li>
            <li>API / consumer contract tests so partial deploys never break the UI silently.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  ),
};

export function TruthContent() {
  return <TabPanel tabs={[dedupTab, mergeTab, validationTab]} ariaLabel="Source of truth sections" />;
}
