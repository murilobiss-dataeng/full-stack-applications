import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Section } from "@/components/Section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Architecture",
  description: "End-to-end architecture: ingestion, S3 data lake, Python processing, PostgreSQL, dbt, and API.",
};

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
      <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">System architecture</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
        Courtlytics mirrors how regulated teams ship analytics: immutable raw landing, typed transformations, relational
        warehouse, declarative metrics in dbt, and a thin API for product surfaces.
      </p>

      <div className="mt-12">
        <ArchitectureDiagram />
      </div>

      <Section
        title="Data ingestion"
        subtitle="Hybrid ingestion matches real legal data programs: streaming-style APIs plus scheduled batch drops."
        className="py-12 md:py-16"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>APIs</CardTitle>
              <CardDescription>
                Vendor and court APIs push JSON payloads into the raw zone with batch IDs for replay and lineage.
                Idempotent writers avoid double-counting when partners retry webhooks.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Batch files</CardTitle>
              <CardDescription>
                Parquet/JSON exports land in S3 prefixes partitioned by ingest_date and source_system. File ingestion
                mirrors partner SFTP drops without blocking API traffic.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Section>

      <Section title="Data lake (AWS S3)" subtitle="S3 is the system of record for immutable raw payloads and audit." className="py-0 md:py-8">
        <Card>
          <CardContent className="pt-6 text-muted-foreground">
            <p>
              Versioned objects, server-side encryption, and lifecycle policies keep bronze data cheap while preserving
              subpoena-ready history. The Python repo maps the same layout locally under <code className="text-foreground">data/raw</code> for
              portability.
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Processing layer" subtitle="Python owns parsing, normalization, deduplication, and fuzzy entity resolution." className="py-12 md:py-16">
        <Card>
          <CardContent className="pt-6 text-muted-foreground">
            <ul className="list-inside list-disc space-y-2">
              <li>Deterministic string hygiene before fuzzy matching reduces false positives.</li>
              <li>Similarity clustering assigns resolved_entity_id with logged confidence.</li>
              <li>Validation failures short-circuit the batch and emit structured logs for alerting.</li>
            </ul>
          </CardContent>
        </Card>
      </Section>

      <Section title="Warehouse" subtitle="PostgreSQL stores curated entities and matter relationships with B-tree indexes for predictable latency." className="py-0 md:py-8">
        <Card>
          <CardContent className="pt-6 text-muted-foreground">
            Foreign keys between cases, courts, and lawyers keep dashboard queries honest. High-cardinality filters use
            composite indexes (for example court_id + filed_at) to avoid sequential scans on fact tables.
          </CardContent>
        </Card>
      </Section>

      <Section title="Transformation layer (dbt)" subtitle="SQL models codify business metrics, tests, and documentation." className="py-12 md:py-16">
        <Card>
          <CardContent className="pt-6 text-muted-foreground">
            The <code className="text-foreground">src/dbt/models</code> folder ships example models (lawyer metrics, court rollups) with schema tests
            mirroring a real dbt project. In production, CI runs <code className="text-foreground">dbt test</code> before promoting artifacts.
          </CardContent>
        </Card>
      </Section>

      <Section title="Serving layer" subtitle="APIs expose curated metrics to the Next.js UI and external consumers." className="py-0 md:pb-8">
        <Card>
          <CardContent className="pt-6 text-muted-foreground">
            Edge-friendly JSON keeps dashboards fast while warehouse SQL remains the heavy lifter. See{" "}
            <code className="text-foreground">/api/metrics</code> for a mock aggregation payload shaped like post-dbt marts.
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
