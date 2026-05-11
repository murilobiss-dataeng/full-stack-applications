import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { AiLabClient } from "./AiLabClient";
import { PlatformScaffoldBanner } from "@/components/PlatformScaffoldBanner";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Self-service lab",
  description:
    "Self-service UX on a ready metrics stack: natural-language prompts answered only from governed /api/metrics — visualization-adjacent proof without raw-table access.",
};

export default function AiLabPage() {
  return (
    <PageShell>
      <Reveal>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Featured simulation
        </div>
        <PageHeader
          kicker="Self-service without metric chaos"
          title="AI Lab — prompt the governed metrics layer"
          description="As a Data Analyst you often sit on top of a fixed metrics layer: prompts here resolve only to approved aggregates (here, /api/metrics) — same contract as Metric truth and BI, conversational UX without inventing a second source of numbers."
        />
      </Reveal>
      <Reveal delayMs={40}>
        <PlatformScaffoldBanner focus="LLM UX is optional; the non-negotiable is the metrics contract underneath — already wired here for demo." />
      </Reveal>
      <Reveal delayMs={80}>
        <AiLabClient />
      </Reveal>
    </PageShell>
  );
}
