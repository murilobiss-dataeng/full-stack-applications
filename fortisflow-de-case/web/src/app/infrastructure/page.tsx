import type { Metadata } from "next";
import { InfrastructureHubClient } from "./InfrastructureHubClient";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "sigma-sec: Data Engineering hub — repo explorer, ELT + governance, pipeline performance (cost, security, governance), data quality & lineage, and DW modeling.",
};

export default function InfrastructurePage() {
  return (
    <PageShell wide>
      <Reveal>
        <PageHeader
          kicker="End-to-end · greenfield narrative"
          title="Infrastructure: from raw land to governed marts"
          description="This hub mirrors standing up a regulated analytics program: layout the repo, run bronze→gold ELT with tests and access in the Infrastructure tab, then use Performance for cost/security/governance tuning of pipelines, Quality &amp; lineage for DQ depth and catalog signals, and DW modeling for grain and SQL. Finish with a thin metrics API before BI or AI touch raw tables."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm">1. Land &amp; catalog</CardTitle>
              <CardDescription className="text-xs">Bronze + contracts</CardDescription>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-muted-foreground">
              Immutable raw, schema checks, quarantine prefixes, and versioned JSON/Parquet drops so replay and audit stay cheap.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm">2. Transform &amp; test</CardTitle>
              <CardDescription className="text-xs">ELT + dbt discipline</CardDescription>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-muted-foreground">
              Normalization, incremental models, <code className="text-foreground">unique</code> / <code className="text-foreground">relationships</code>{" "}
              tests, and CI gates before anything promotes to analyst-facing schemas.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm">3. Trust layer</CardTitle>
              <CardDescription className="text-xs">Governance in the loop</CardDescription>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-muted-foreground">
              Lineage metadata, RBAC/masking patterns, structured logs with <code className="text-foreground">batch_id</code>, and
              alerts when freshness or volume drifts from baseline.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm">4. Serve</CardTitle>
              <CardDescription className="text-xs">API + consumers</CardDescription>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-muted-foreground">
              A governed <code className="text-foreground">/api/metrics</code> contract, then dashboards and AI Lab prompts that
              never bypass the published grain.
            </CardContent>
          </Card>
        </div>
      </Reveal>
      <Reveal delayMs={60}>
        <PlatformScaffoldBanner focus="Use Performance for pipeline economics and gates, Quality & lineage for tests and catalog depth, Infrastructure for the combined ELT story, then DW modeling + Analytics + AI Lab for the full hand-off." />
      </Reveal>
      <Reveal delayMs={80}>
        <InfrastructureHubClient />
      </Reveal>
    </PageShell>
  );
}
