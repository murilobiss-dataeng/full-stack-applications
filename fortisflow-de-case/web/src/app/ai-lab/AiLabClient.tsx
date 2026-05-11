"use client";

import { useCallback, useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MetricsPayload } from "@/types/metrics";

const DEFAULT_PROMPT =
  "Summarize sigma-sec manufacturing/supply-chain identity resolution quality and top supplier plants from the latest curated batch. Include one risk bullet.";

type Phase = "idle" | "fetching" | "typing" | "done";

export function AiLabClient() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [phase, setPhase] = useState<Phase>("idle");
  const [output, setOutput] = useState("");

  const run = useCallback(async () => {
    setPhase("fetching");
    setOutput("");
    try {
      const res = await fetch("/api/metrics");
      const m = (await res.json()) as MetricsPayload;
      const text = buildNarrative(m, prompt);
      setPhase("typing");
      let i = 0;
      const id = window.setInterval(() => {
        i += 4;
        setOutput(text.slice(0, Math.min(i, text.length)));
        if (i >= text.length) {
          window.clearInterval(id);
          setPhase("done");
        }
      }, 22);
    } catch {
      setPhase("done");
      setOutput("Could not reach /api/metrics. In production this panel would call your governed metrics API with auth.");
    }
  }, [prompt]);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-primary/35 bg-gradient-to-br from-primary/10 via-card/90 to-card shadow-lg shadow-primary/5">
        <div className="flex items-center gap-2 border-b border-primary/20 bg-primary/10 px-4 py-2.5 text-xs font-medium text-primary">
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
          Simulation: answers are generated client-side from live governed mock metrics (not a real LLM).
        </div>
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Wand2 className="h-5 w-5 text-primary" aria-hidden />
            Analyst-style prompt
          </CardTitle>
          <CardDescription className="text-sm">
            Ask in natural language; the demo stitches <code className="text-foreground">/api/metrics</code> fields into a
            structured brief, the same pattern a RAG agent would use over your metadata and mart API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground" htmlFor="ai-prompt">
            Prompt
          </label>
          <textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full resize-y rounded-xl border border-border bg-background/80 px-3 py-2.5 text-sm leading-relaxed text-foreground shadow-inner outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            spellCheck={false}
          />
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={run} disabled={phase === "fetching" || phase === "typing"} className="gap-2">
              {phase === "fetching" || phase === "typing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Running…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Run on live metrics
                </>
              )}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setPrompt(DEFAULT_PROMPT)}>
              Reset sample prompt
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Structured answer</CardTitle>
          <CardDescription className="text-xs">Typed progressively for effect; content is deterministic from the API.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-muted-foreground sm:text-[13px]",
              phase === "done" && output && "text-foreground/95",
            )}
          >
            {output || (phase === "idle" ? "Run the prompt to synthesize metrics from your stack." : null)}
            {phase === "typing" ? <span className="ml-0.5 inline-block h-4 w-1 animate-pulse bg-primary align-middle" /> : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function buildNarrative(m: MetricsPayload, userPrompt: string): string {
  const p = m.pipeline as { rowsProcessed?: number; validationPassRate?: number; lastRunDurationMs?: number } | undefined;
  const e = m.entityResolution as { clustersMerged?: number; avgConfidence?: number } | undefined;
  const batch = typeof m.batchId === "string" ? m.batchId : "unknown-batch";
  const partners = Array.isArray(m.partnerPerformance)
    ? (m.partnerPerformance as { name?: string; orders?: number; onTimeRate?: number }[])
    : [];

  const top = partners
    .slice()
    .sort((a, b) => (b.orders ?? 0) - (a.orders ?? 0))
    .slice(0, 2)
    .map(
      (p) =>
        `${p.name ?? "?"} (${(p.orders ?? 0).toLocaleString()} work orders, on-time ~${Math.round(
          (p.onTimeRate ?? 0) * 100,
        )}%)`,
    )
    .join("; ");

  return [
    `» Request (truncated): ${userPrompt.slice(0, 120)}${userPrompt.length > 120 ? "…" : ""}`,
    "",
    "Executive read: sigma-sec curated mart + pipeline health",
    `• Batch: ${batch}`,
    `• Rows processed (last run): ${p?.rowsProcessed?.toLocaleString?.() ?? "n/a"}`,
    `• Validation pass rate: ${p?.validationPassRate != null ? (p.validationPassRate * 100).toFixed(1) + "%" : "n/a"}`,
    `• Job duration: ${p?.lastRunDurationMs?.toLocaleString?.() ?? "n/a"} ms`,
    `• Supplier clusters merged: ${e?.clustersMerged?.toLocaleString?.() ?? "n/a"} at avg confidence ${e?.avgConfidence != null ? (e.avgConfidence * 100).toFixed(0) + "%" : "n/a"}`,
    "",
    "Top supplier plants (golden IDs)",
    `• ${top || "No partner slice in payload."}`,
    "",
    "Risk / watchlist",
    "• If validation pass slips below 99.5%, freeze mart publish and replay quarantine (see Governance + Source of truth).",
    "• Low-confidence merges should land in a human queue before production releases and compliance reporting: policy, not model magic.",
    "",
    "Next step in a real deployment: log this summary with run_id + user role; call the same API the dashboard uses.",
  ].join("\n");
}
