"use client";

import { Suspense } from "react";
import { TruthContent } from "./TruthContent";
import { CaseStudyContent } from "../case-study/CaseStudyContent";
import { TruthVisualizationPanel } from "./TruthVisualizationPanel";
import { NavRail } from "@/components/NavRail";

const sections = [
  { id: "truth", label: "Source of truth", hint: "Lineage, dedup, merges, validation, API" },
  { id: "visualization", label: "Visualization & value", hint: "Proof on charts, same contract as BI" },
  { id: "narrative", label: "Narrative", hint: "Stakeholder story and scale, finance and tax lens" },
] as const;

function HubInner() {
  return (
    <NavRail
      sections={[...sections]}
      paramName="section"
      basePath="/source-of-truth"
      panels={{
        truth: <TruthContent />,
        visualization: <TruthVisualizationPanel />,
        narrative: <CaseStudyContent />,
      }}
    />
  );
}

export function TruthHubClient() {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse rounded-2xl bg-muted/30" aria-hidden />}>
      <HubInner />
    </Suspense>
  );
}
