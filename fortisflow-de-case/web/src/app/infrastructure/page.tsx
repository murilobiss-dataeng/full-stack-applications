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
    "sigma-sec: Data Engineering hub — repo explorer, ELT, pipeline performance, data quality & lineage, dedicated Governance, and DW modeling.",
};

export default function InfrastructurePage() {
  return (
    <PageShell wide>
      <Reveal>
        <PageHeader
          kicker="End-to-end · greenfield narrative"
          title="Infrastructure: from raw land to governed marts"
          description="This hub mirrors standing up a regulated analytics program: layout the repo, run bronze→gold ELT in the Infrastructure tab, tune cost and security in Performance, deepen tests and lineage in Quality &amp; lineage, then open the Governance tab for charter, IAM, contracts, and exec posture. DW modeling covers grain and SQL; finish with a thin metrics API before BI or AI touch raw tables."
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
        <PlatformScaffoldBanner focus="Use the Governance rail for charter, IAM, and security depth; Infrastructure for ELT; Performance and Quality & lineage for how the stack stays cheap and trustworthy; then DW modeling + Analytics + AI Lab for the full story." />
      </Reveal>
      <Reveal delayMs={80}>
        <InfrastructureHubClient />
      </Reveal>
    </PageShell>
  );
}
