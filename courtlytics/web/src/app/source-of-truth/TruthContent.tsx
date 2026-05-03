"use client";

import Link from "next/link";
import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TruthJourneySim } from "./TruthJourneySim";

const journeyTab: TabItem = {
  id: "journey",
  label: "Journey to API",
  content: <TruthJourneySim />,
};

const dedupTab: TabItem = {
  id: "dedup",
  label: "Dedup & identity",
  content: (
    <div className="space-y-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Normalization first</CardTitle>
          <CardDescription className="text-xs">Always deterministic before fuzzy math</CardDescription>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Lowercase, trim, NFKC unicode, collapse internal whitespace. Strip honorifics only when a dictionary says it is safe
          for your jurisdiction. Log <code className="text-foreground">name_hash_pre</code> / <code className="text-foreground">name_hash_post</code> for
          audit replay.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Blocking &amp; pairs</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Partition candidates by state + last name Soundex (or minhash) so pairwise similarity stays O(block) not O(n²).
          Union-find merges pairs above threshold; persist cluster_id before promoting to{" "}
          <code className="text-foreground">resolved_entity_id</code>.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Alert when average cluster size spikes (bad threshold) or singleton rate jumps (over-split). Compare weekly to a
          trailing baseline — cheap SQL on staging metadata.
        </CardContent>
      </Card>
    </div>
  ),
};

const mergeTab: TabItem = {
  id: "merge",
  label: "Merge rules",
  content: (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Source precedence</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Court-certified roster beats paid aggregator beats scraped directory. Store{" "}
            <code className="text-foreground">source_rank</code> and <code className="text-foreground">last_verified_at</code>; on tie, prefer higher
            rank + fresher verification timestamp.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Survivorship</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Prefer longest clean display name; never merge two lawyer_ids without a shared hard key (bar number, tax ID).
            Emit <code className="text-foreground">merge_decision_id</code> for downstream reversibility.
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Conflict resolution matrix</CardTitle>
          <CardDescription className="text-xs">Document once; enforce in code + review UI</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto text-xs">
          <table className="w-full min-w-[480px] border-collapse text-left text-muted-foreground">
            <thead>
              <tr className="border-b border-border text-foreground">
                <th className="py-2 pr-2 font-medium">Conflict</th>
                <th className="py-2 pr-2 font-medium">Rule</th>
                <th className="py-2 font-medium">Escalation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-2">Different bar numbers</td>
                <td className="py-2 pr-2">Never auto-merge</td>
                <td className="py-2">Human + document exception</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-2">Same bar, different spelling</td>
                <td className="py-2 pr-2">Auto-merge if confidence ≥ 0.95</td>
                <td className="py-2">Queue if 0.85–0.94</td>
              </tr>
              <tr>
                <td className="py-2 pr-2">Missing bar, high name similarity</td>
                <td className="py-2 pr-2">Suggest only</td>
                <td className="py-2">Analyst confirms</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  ),
};

const validationTab: TabItem = {
  id: "validation",
  label: "Validation & contracts",
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
              in dbt; cross-table balance checks when facts exist.
            </li>
            <li>
              <strong className="text-foreground">Timeliness:</strong> freshness SLA per source — alert if bronze ingest
              misses a window.
            </li>
            <li>
              <strong className="text-foreground">Bias / audit:</strong> log merge decisions with rule version + optional
              human reviewer id for high-risk matches.
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
          <p className="mt-4 text-xs">
            Cross-reference:{" "}
            <Link href="/governance" className="text-primary underline-offset-4 hover:underline">
              Governance
            </Link>{" "}
            for ownership + classification, and{" "}
            <Link href="/data-pipeline" className="text-primary underline-offset-4 hover:underline">
              Pipeline
            </Link>{" "}
            for quarantine replay.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

const apiTab: TabItem = {
  id: "api",
  label: "Published API surface",
  content: (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Consumers see only curated contracts</CardTitle>
        <CardDescription className="text-xs">
          The route handler validates JSON shape; dashboards never query raw S3 or staging tables.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
        <p>
          Example: <code className="text-foreground">GET /api/metrics</code> returns batch metadata + mart slices. Add{" "}
          <code className="text-foreground">ETag</code> or <code className="text-foreground">run_id</code> so clients detect stale payloads after a
          backfill.
        </p>
        <p>
          Try the live mock:{" "}
          <Link href="/api/metrics" className="text-primary underline-offset-4 hover:underline">
            /api/metrics
          </Link>{" "}
          and the{" "}
          <Link href="/dashboard" className="text-primary underline-offset-4 hover:underline">
            Dashboard
          </Link>
          . For an AI-on-metrics simulation, see{" "}
          <Link href="/ai-lab" className="text-primary underline-offset-4 hover:underline">
            AI Lab
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  ),
};

export function TruthContent() {
  return (
    <TabPanel
      tabs={[journeyTab, dedupTab, mergeTab, validationTab, apiTab]}
      ariaLabel="Source of truth sections"
    />
  );
}
