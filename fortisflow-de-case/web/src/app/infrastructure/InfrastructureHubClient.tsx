"use client";

import { Suspense } from "react";
import { RepoExplorer } from "../explorer/RepoExplorer";
import { PipelineContent } from "../data-pipeline/PipelineContent";
import { ModelingContent } from "../data-modeling/ModelingContent";
import { GovernanceContent } from "../governance/GovernanceContent";
import { DataQualityLineageContent } from "./DataQualityLineageContent";
import { PerformanceContent } from "./PerformanceContent";
import { NavRail } from "@/components/NavRail";
import { SITE_PRODUCT_NAME } from "@/config/branding";

const sections = [
  { id: "explorer", label: "Repo explorer", hint: "Monorepo layout: raw → curated → dbt → API (as if greenfield)" },
  {
    id: "infrastructure",
    label: "Infrastructure",
    hint: "Snowflake & ELT plus quality, contracts, lineage, and ops — one continuous build story",
  },
  {
    id: "performance",
    label: "Performance",
    hint: "Design and tune pipelines: cost, security in motion, governance gates",
  },
  {
    id: "quality",
    label: "Quality & lineage",
    hint: "DQ dimensions, tests, quarantine, column lineage, catalog, observability",
  },
  {
    id: "modeling",
    label: "DW modeling",
    hint: "Grain, diagrams, Snowflake-oriented patterns, example SQL & performance notes",
  },
] as const;

function InfrastructureCombinedPanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4 text-xs leading-relaxed text-muted-foreground sm:p-5 sm:text-sm">
        <p className="font-semibold text-foreground">Week-zero checklist (how this hub reads end to end)</p>
        <ul className="mt-3 list-inside list-disc space-y-1.5 marker:text-primary">
          <li>Partition landing buckets by source system; pin immutable bronze with load timestamps and a monotonic batch id.</li>
          <li>Ship ingestion contracts (required columns, types, max null rates) before widening to analysts — reject early, quarantine late.</li>
          <li>Normalize in staging with idempotent merges; resolve entities once; document SCD strategy per dimension.</li>
          <li>Promote marts only through dbt with uniqueness, relationships, and accepted-values tests wired in CI.</li>
          <li>Mirror the same batch id in logs, API responses, and BI filters so replay, audit, and support stay aligned.</li>
          <li>Layer RBAC, masking, and freshness alerts on the published schemas — not on ad-hoc extracts.</li>
        </ul>
      </div>

      <section className="space-y-3" aria-labelledby="infra-elt-heading">
        <h2 id="infra-elt-heading" className="text-sm font-semibold text-foreground">
          Snowflake &amp; ELT
        </h2>
        <p className="text-xs text-muted-foreground">
          Zones, loaders, incremental SQL, and cost-aware patterns — the mechanics you would document before the first production cut.
        </p>
        <PipelineContent />
      </section>

      <div className="border-t border-border/80 pt-8" role="presentation" />

      <section className="space-y-3" aria-labelledby="infra-gov-heading">
        <h2 id="infra-gov-heading" className="text-sm font-semibold text-foreground">
          Quality &amp; governance
        </h2>
        <p className="text-xs text-muted-foreground">
          Tests, lineage, access, and observability in the same breath as pipelines — no separate “governance project” bolted on later.
        </p>
        <GovernanceContent />
      </section>
    </div>
  );
}

function HubInner() {
  return (
    <NavRail
      sections={[...sections]}
      paramName="section"
      basePath="/infrastructure"
      panels={{
        explorer: (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Browse the {SITE_PRODUCT_NAME} repo layout as if it were Git; files open in the pane on the right. This is the
              “day zero” story: how you would structure a data platform repo before the first production cutover.
            </p>
            <RepoExplorer />
          </div>
        ),
        infrastructure: <InfrastructureCombinedPanel />,
        performance: <PerformanceContent />,
        quality: <DataQualityLineageContent />,
        modeling: <ModelingContent />,
      }}
    />
  );
}

export function InfrastructureHubClient() {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse rounded-2xl bg-muted/30" aria-hidden />}>
      <HubInner />
    </Suspense>
  );
}
