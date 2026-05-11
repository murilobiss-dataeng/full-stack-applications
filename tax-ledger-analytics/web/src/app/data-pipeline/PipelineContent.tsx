"use client";

import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const pySnippet = `def run_partner_pipeline(*, batch_id: str | None = None) -> dict:
    raw_records = _read_raw_partner_feed(raw_dir, batch)
    normalized = [normalize_record_fields(dict(r)) for r in raw_records]
    deduped = flag_duplicates(normalized)
    resolved = resolve_partner_entities(deduped)`;

const sqlSnippet = `SELECT resolved_entity_id,
       COUNT(DISTINCT order_id) AS orders_touched
FROM partners p
JOIN order_partner op USING (partner_id)
GROUP BY 1;`;

const flowTab: TabItem = {
  id: "zones",
  label: "Zones",
  content: (
    <div className="grid gap-3 md:grid-cols-3">
      {[
        { zone: "Raw", desc: "Exact payloads from APIs/files. Append-only bronze." },
        { zone: "Staging", desc: "Normalized strings, duplicate flags, profiling." },
        { zone: "Curated", desc: "Golden-ready rows + resolved_entity_id + validation." },
      ].map((z) => (
        <Card key={z.zone} className="transition-colors hover:border-[hsl(217,33%,24%)]">
          <CardHeader className="pb-1 pt-4">
            <CardTitle className="text-sm">{z.zone}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">{z.desc}</CardContent>
        </Card>
      ))}
    </div>
  ),
};

const codeTab: TabItem = {
  id: "code",
  label: "Code",
  content: (
    <div className="grid gap-3 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Python ETL</p>
        <pre className="max-h-[220px] overflow-auto rounded-lg border border-border bg-muted/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
          <code>{pySnippet}</code>
        </pre>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">dbt mart</p>
        <pre className="max-h-[220px] overflow-auto rounded-lg border border-border bg-muted/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
          <code>{sqlSnippet}</code>
        </pre>
      </div>
    </div>
  ),
};

const testingTab: TabItem = {
  id: "testing",
  label: "How we test",
  content: (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Start with <strong className="text-foreground">fast, deterministic tests</strong> on every push; add slower
        integration jobs on main or nightly so GitHub minutes stay predictable for a startup.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Local &amp; PR (every commit)</CardTitle>
            <CardDescription className="text-xs">No paid infra required</CardDescription>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5">
              <li>
                <code className="text-foreground">pytest</code> on normalization, dedupe, and resolution with frozen fixtures
                under <code className="text-foreground">tests/</code>.
              </li>
              <li>
                Table-driven scenarios: one JSON per case (messy name, alias collision, missing hub) — easy for analysts /
                PMs to review as living spec.
              </li>
              <li>
                End-to-end on fixture dirs: copy <code className="text-foreground">data/raw</code> sample → run pipeline →
                diff <code className="text-foreground">curated</code> against committed expected output (or hash).
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">CI matrix (options)</CardTitle>
            <CardDescription className="text-xs">Turn on when ready</CardDescription>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="list-inside list-disc space-y-1.5">
              <li>
                <strong className="text-foreground">Job A:</strong> Python only (current repo default) — completes in
                under a minute.
              </li>
              <li>
                <strong className="text-foreground">Job B:</strong> Postgres service container + migrate + ETL + row
                assertions (weekly or on release tags if minutes are tight).
              </li>
              <li>
                <strong className="text-foreground">Job C:</strong> <code className="text-foreground">dbt test</code> against
                a disposable schema built from seed CSVs — catches mart regressions without production access.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

const dqTab: TabItem = {
  id: "dq",
  label: "Data quality",
  content: (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs">Raw → staging</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Schema validation (required fields, types), file size caps, duplicate batch_id detection. Fail fast →
            quarantine prefix + alert webhook (Slack free).
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs">Staging → curated</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Distribution checks: null rate jumps, cardinality of <code className="text-foreground">hub_id</code>, max
            string lengths. Compare row count to trailing 7-day median ± threshold.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs">Curated → marts</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            dbt <code className="text-foreground">unique</code> / <code className="text-foreground">relationships</code> /{" "}
            <code className="text-foreground">accepted_values</code>; optional Elementary for volume anomalies; block deploy
            if severity = error.
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">SLAs without an enterprise catalog (yet)</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Publish a one-page &quot;data contract&quot; per source: owner, refresh SLA, primary key, known quirks. Version it
          next to the pipeline. When AI assists (see Architecture → AI tab), point the model at that doc — not at raw PII
          rows — to keep reviews cheap and safe.
        </CardContent>
      </Card>
    </div>
  ),
};

const opsTab: TabItem = {
  id: "ops",
  label: "Reliability",
  content: (
    <div className="grid gap-3 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Incremental</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          Batch watermarks let replays and parallel backfills avoid clobbering curated tables.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Validation gates</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          Hard stops before promote: Python checks + dbt tests + (optional) human approval for entity merges above risk
          score.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Logging &amp; cost</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          JSON logs with batch_id, stage, duration — correlation IDs tie API retries to ETL partitions. Sample DEBUG in
          prod; aggregate metrics only to keep log storage cheap.
        </CardContent>
      </Card>
    </div>
  ),
};

export function PipelineContent() {
  return (
    <TabPanel tabs={[flowTab, codeTab, testingTab, dqTab, opsTab]} ariaLabel="Pipeline sections" />
  );
}
