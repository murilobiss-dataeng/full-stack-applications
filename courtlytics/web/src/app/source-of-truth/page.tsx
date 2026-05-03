import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Source of Truth",
  description: "Deduplication logic, merge rules, and data validation for governed legal entities.",
};

export default function SourceOfTruthPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Source of truth</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
        A source of truth is not a single database — it is a set of contracts: which layer may mutate which fields, how
        conflicts resolve, and how quality is proven before metrics reach stakeholders.
      </p>

      <Section title="Deduplication logic" subtitle="Pairwise similarity on canonicalized strings with transitive closure." className="py-12 md:py-16">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Records are normalized (lowercase, trim, NFKC) before similarity scoring. Union-find merges pairs above a
            configurable threshold so chains of near-duplicates collapse consistently. The pipeline logs cluster size
            distributions to catch threshold drift.
          </CardContent>
        </Card>
      </Section>

      <Section title="Merge rules" subtitle="Deterministic precedence when two golden candidates disagree." className="py-0 md:py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vendor precedence</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Court-certified roster wins over scraped directories. Timestamp tie-breaker uses last_verified_at when
              scores tie.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Field-level survivorship</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Display names prefer the longest non-noisy string; identifiers never merge without a shared hard key (bar
              number) when available.
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Data validation strategy" subtitle="Defense in depth from file landing to BI." className="py-12 md:py-16">
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            <ol className="list-inside list-decimal space-y-2">
              <li>Pipeline schema checks reject malformed batches before writes.</li>
              <li>Great Expectations-style row checks (simulated here) assert distributions on staging.</li>
              <li>dbt tests enforce uniqueness and accepted values on marts.</li>
              <li>API schema validation shields consumers from partial deploys.</li>
            </ol>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
