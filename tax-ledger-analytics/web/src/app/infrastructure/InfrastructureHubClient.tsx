"use client";

import { Suspense } from "react";
import { ArchitectureContent } from "../architecture/ArchitectureContent";
import { GovernanceContent } from "../governance/GovernanceContent";
import { RepoExplorer } from "../explorer/RepoExplorer";
import { PipelineContent } from "../data-pipeline/PipelineContent";
import { ModelingContent } from "../data-modeling/ModelingContent";
import { NavRail } from "@/components/NavRail";
import { SITE_PRODUCT_NAME } from "@/config/branding";

const sections = [
  { id: "platform", label: "Platform", hint: "Flows, tiers, cloud options, tests & AI" },
  { id: "governance", label: "Governance", hint: "Security, IAM, contracts, lineage, costs" },
  { id: "explorer", label: "Repo explorer", hint: "Static tree of the monorepo" },
  { id: "pipeline", label: "Marts & pipelines", hint: "Zones, code, testing, DQ, reliability" },
  { id: "modeling", label: "Modeling", hint: "Diagram, tables, tools, SQL examples, performance" },
] as const;

function HubInner() {
  return (
    <NavRail
      sections={[...sections]}
      paramName="section"
      basePath="/infrastructure"
      panels={{
        platform: <ArchitectureContent />,
        governance: <GovernanceContent />,
        explorer: (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Browse the {SITE_PRODUCT_NAME} repo layout as if it were Git — files open in the pane on the right.
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
