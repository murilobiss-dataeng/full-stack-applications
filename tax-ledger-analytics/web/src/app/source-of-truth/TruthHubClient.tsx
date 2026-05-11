"use client";

import { Suspense } from "react";
import { TruthContent } from "./TruthContent";
import { CaseStudyContent } from "../case-study/CaseStudyContent";
import { NavRail } from "@/components/NavRail";

const sections = [
  { id: "truth", label: "Source of truth", hint: "Lineage, dedup, merges, validation, API" },
  { id: "narrative", label: "Narrative", hint: "Stakeholder story + scale — finance / tax lens" },
] as const;

function HubInner() {
  return (
    <NavRail
      sections={[...sections]}
      paramName="section"
      basePath="/source-of-truth"
      panels={{
        truth: <TruthContent />,
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
