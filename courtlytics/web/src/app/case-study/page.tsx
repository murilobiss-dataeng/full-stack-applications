import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Case Study",
  description: "Duplicate data, entity resolution strategy, trade-offs, and scalability.",
};

export default function CaseStudyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Case study</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
        Shipping lawyer-level KPIs when upstream systems disagree on identity is a classic data engineering problem. This
        page documents the approach Courtlytics takes and the compromises we accept at scale.
      </p>

      <Section title="Duplicate data challenges" subtitle="The same human appears with different tokens, orders, and diacritics." className="py-12 md:py-16">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Vendor A emits &quot;Smith, John&quot; while Vendor B emits &quot;John Smith&quot; and internal CRM stores &quot;J.
            Smith&quot;. Without resolution, matter counts double and win rates drift. The bronze layer preserves every
            variant for audit; silver applies deterministic normalization; gold assigns resolved_entity_id.
          </CardContent>
        </Card>
      </Section>

      <Section title="Entity resolution strategy" subtitle="Two-pass: cheap exact keys, then fuzzy clustering with guardrails." className="py-0 md:py-8">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            SequenceMatcher-based similarity handles typographical variance after unicode normalization. Token-subset
            boosts help when initials collapse longer names. Confidence scores flow to the warehouse so analysts can
            filter low-trust merges. Human-in-the-loop queues (not implemented in the demo) would own edge clusters.
          </CardContent>
        </Card>
      </Section>

      <Section title="Trade-offs" subtitle="Precision vs recall vs latency." className="py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Fuzzy matching",
              body: "Fast to ship but can over-merge common names. Mitigation: court + bar number enrichment when available.",
            },
            {
              title: "Graph approaches",
              body: "Better for ambiguous identities, higher operational cost. Deferred until graph features justify spend.",
            },
            {
              title: "Blocking",
              body: "Partition candidates by last name soundex + state to keep pairwise comparisons bounded as volume grows.",
            },
          ].map((c) => (
            <Card key={c.title}>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Scalability decisions" subtitle="How the design holds past demo scale." className="py-0 md:pb-8">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Raw data stays in S3 with columnar silver tables (Iceberg/Delta in a full stack). Python workers autoscale on
            queue depth. PostgreSQL holds conformed dimensions; heavy scans move to columnar marts refreshed by dbt. The
            API stays stateless behind a CDN with cache keys per mart version.
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
