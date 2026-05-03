import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Data Pipeline",
  description: "Raw to staging to curated flows, Python ETL, validation, and logging.",
};

const pySnippet = `def run_lawyer_pipeline(*, batch_id: str | None = None) -> dict:
    raw_records = _read_raw_lawyers(raw_dir, batch)
    normalized = [normalize_record_fields(dict(r)) for r in raw_records]
    deduped = flag_duplicates(normalized)
    resolved = resolve_lawyer_entities(deduped)
    # write staging + curated JSON zones + structured logs`;

const sqlSnippet = `-- dbt mart built on curated lawyers + cases
SELECT resolved_entity_id,
       COUNT(DISTINCT case_id) AS cases_touched
FROM lawyers l
JOIN case_lawyer cl USING (lawyer_id)
GROUP BY 1;`;

export default function DataPipelinePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Data pipeline</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
        The pipeline implements a bronze → silver → gold cadence: land immutable raw files, normalize into staging, then
        publish curated entities ready for warehouse loads and dbt marts.
      </p>

      <Section title="Zones" subtitle="Each hop tightens schema and trust." className="py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { zone: "Raw", desc: "Exact payloads from APIs/files. Wide schema, append-only." },
            { zone: "Staging", desc: "Normalized strings, duplicate flags, profiling stats." },
            { zone: "Curated", desc: "Golden-ready rows with resolved_entity_id and validation stamps." },
          ].map((z) => (
            <Card key={z.zone}>
              <CardHeader>
                <CardTitle className="text-base">{z.zone}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{z.desc}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Python ETL" subtitle="Modular stages keep unit tests focused and failures diagnosable." className="py-0 md:py-8">
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-left text-xs leading-relaxed text-muted-foreground md:text-sm">
          <code>{pySnippet}</code>
        </pre>
      </Section>

      <Section title="dbt SQL" subtitle="Warehouse transformations stay declarative and reviewable in PRs." className="py-12 md:py-16">
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-left text-xs leading-relaxed text-muted-foreground md:text-sm">
          <code>{sqlSnippet}</code>
        </pre>
      </Section>

      <Section title="Incremental loads" subtitle="Batch IDs partition raw objects so replays are idempotent." className="py-0 md:py-8">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            New filings append to the raw prefix for the day. Downstream jobs read only the batch watermark they own,
            enabling parallel backfills without clobbering curated tables.
          </CardContent>
        </Card>
      </Section>

      <Section title="Data validation" subtitle="Cheap checks early, expensive joins later." className="py-12 md:py-16">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Required keys (for example lawyer_id, full_name) gate the pipeline before fuzzy matching runs. dbt tests on
            uniqueness and referential integrity catch drift after warehouse loads.
          </CardContent>
        </Card>
      </Section>

      <Section title="Logging" subtitle="Structured JSON logs carry batch_id, stage, duration, and counts." className="py-0 md:pb-8">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Logs stream to stdout locally and to OpenSearch/Datadog in production. Correlation IDs tie API retries to ETL
            partitions for supportable operations.
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
