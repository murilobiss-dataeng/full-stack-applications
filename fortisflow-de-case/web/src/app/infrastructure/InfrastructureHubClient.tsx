"use client";

import { Suspense } from "react";
import { RepoExplorer } from "../explorer/RepoExplorer";
import { PipelineContent } from "../data-pipeline/PipelineContent";
import { ModelingContent } from "../data-modeling/ModelingContent";
import { NavRail } from "@/components/NavRail";
import { SITE_PRODUCT_NAME } from "@/config/branding";

const sections = [
  { id: "explorer", label: "Repo explorer", hint: "How the monorepo maps to marts and the web app" },
  { id: "pipeline", label: "Marts & pipelines", hint: "Grain, dbt-style tests, and what feeds the metrics API" },
  { id: "modeling", label: "Modeling", hint: "Diagram, tables, Snowflake-oriented tooling, SQL examples" },
] as const;

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
              Browse the {SITE_PRODUCT_NAME} repo layout as if it were Git; files open in the pane on the right.
            </p>
            <RepoExplorer />
          </div>
        ),
        pipeline: <PipelineContent />,
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
