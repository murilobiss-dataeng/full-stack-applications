import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { AiLabClient } from "./AiLabClient";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Self-service lab",
  description:
    "Analytics Engineering pattern: natural-language prompts answered only from governed /api/metrics — no raw-table access, no external hallucination risk in this demo.",
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
          description="Analytics Engineering owns the boundary: analysts ask in natural language, but answers only come from approved aggregates (here, /api/metrics). No external LLM — an honest sketch of how copilots should sit on top of your semantic contracts, not raw tables."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <AiLabClient />
      </Reveal>
    </PageShell>
  );
}
