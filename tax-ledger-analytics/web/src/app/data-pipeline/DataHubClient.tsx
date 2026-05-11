"use client";

import { Suspense } from "react";
import { PipelineContent } from "./PipelineContent";
import { ModelingContent } from "../data-modeling/ModelingContent";
import { NavRail } from "@/components/NavRail";

const sections = [
  { id: "pipeline", label: "Pipeline", hint: "Zones, code, testing, DQ, reliability" },
  { id: "modeling", label: "Modeling", hint: "Diagram, tables, tools, SQL examples, performance" },
] as const;

function HubInner() {
  return (
    <NavRail
      sections={[...sections]}
      paramName="section"
      basePath="/data-pipeline"
      panels={{
        pipeline: <PipelineContent />,
        modeling: <ModelingContent />,
      }}
    />
  );
}

export function DataHubClient() {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse rounded-2xl bg-muted/30" aria-hidden />}>
      <HubInner />
    </Suspense>
  );
}
