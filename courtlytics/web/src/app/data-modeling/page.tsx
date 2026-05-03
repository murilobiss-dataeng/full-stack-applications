import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Data Modeling",
  description: "PostgreSQL schema for lawyers, cases, courts, and relationships with indexing strategy.",
};

export default function DataModelingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">PostgreSQL data modeling</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
        Third normal form keeps entities honest while bridge tables express many-to-many realities (matters involving
        multiple counsel). Indexes align with the heaviest dashboard predicates.
      </p>

      <Section title="Core tables" subtitle="Surrogate keys from sources are preserved; resolved_entity_id is the analytics grain." className="py-12 md:py-16">
        <div className="space-y-4">
          {[
            {
              name: "lawyers",
              body: "lawyer_id (PK), full_name, name_canonical, resolved_entity_id, bar_state, practice_area, created_at. Indexes on resolved_entity_id and name_canonical accelerate golden-record joins and search-as-you-type.",
            },
            {
              name: "courts",
              body: "court_id (PK), court_name, state_code, tier. Composite index on (state_code, tier) powers regional rollups without scanning the full dimension.",
            },
            {
              name: "cases",
              body: "case_id (PK), court_id (FK), case_title, filed_at, closed_at, outcome, duration_days. Composite index on (court_id, filed_at DESC) supports trend charts filtered by venue.",
            },
            {
              name: "case_lawyer",
              body: "Bridge table: case_id + lawyer_id + role (PK) with FK cascades. Partial indexes can prioritize lead counsel rows when roles skew the distribution.",
            },
          ].map((t) => (
            <Card key={t.name}>
              <CardHeader>
                <CardTitle className="font-mono text-base">{t.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{t.body}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Normalization" subtitle="Separate dimensions from facts so late-arriving court corrections do not rewrite history." className="py-0 md:py-8">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Courts and lawyers are conformed dimensions. Case outcomes live on the fact table with dates typed as DATE
            (not free text) to keep window functions deterministic across sessions.
          </CardContent>
        </Card>
      </Section>

      <Section title="Primary and foreign keys" subtitle="Referential integrity is non-negotiable once metrics drive compensation." className="py-12 md:py-16">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            case_lawyer enforces that every matter link points at real cases and lawyers. ON DELETE CASCADE on bridge rows
            prevents orphan edges when a sandbox batch is rolled back.
          </CardContent>
        </Card>
      </Section>

      <Section title="Query optimization" subtitle="Measure, index, materialize — in that order." className="py-0 md:pb-8">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            EXPLAIN plans on SDNY-filtered timelines should hit idx_cases_court_filed. Heavy lawyer mart queries read from
            dbt-built tables (see <code className="text-foreground">src/dbt/models/lawyer_metrics.sql</code>) instead of scanning raw joins during peak traffic.
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
