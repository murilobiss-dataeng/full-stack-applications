import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { AiLabClient } from "./AiLabClient";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "AI Lab",
  description:
    "Simulated analyst prompt over live mock metrics — demonstrates RAG-style access to governed data without exposing raw PII.",
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
          kicker="Assistive AI"
          title="AI Lab — prompt the metrics layer"
          description="A deliberately flashy but honest demo: no external LLM runs here. The browser fetches /api/metrics and formats a narrative the way a governed copilot would — grounded in your own API contracts, not hallucinated rows."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <AiLabClient />
      </Reveal>
    </PageShell>
  );
}
