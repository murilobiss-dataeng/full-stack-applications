"use client";

import { useEffect, useState } from "react";

type NodeId = "courts" | "lawyers" | "cases" | "bridge";

const flow: { from: NodeId; to: NodeId; caption: string }[] = [
  { from: "courts", to: "cases", caption: "cases.court_id → courts.court_id (jurisdiction grain for nexus / filing venue)" },
  { from: "lawyers", to: "bridge", caption: "case_lawyer.lawyer_id → lawyers.lawyer_id (counterparty ↔ transaction bridge)" },
  { from: "cases", to: "bridge", caption: "case_lawyer.case_id → cases.case_id" },
];

const nodes: { id: NodeId; title: string; subtitle: string }[] = [
  { id: "courts", title: "courts", subtitle: "jurisdiction dimension" },
  { id: "lawyers", title: "lawyers", subtitle: "counterparty / party + golden id" },
  { id: "cases", title: "cases", subtitle: "transaction / filing facts" },
  { id: "bridge", title: "case_lawyer", subtitle: "allocation bridge (M:N)" },
];

export function ModelingDiagram() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setPulse((p) => (p + 1) % flow.length), 1500);
    return () => window.clearInterval(id);
  }, []);

  const active = flow[pulse];

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        The diagram cycles through foreign-key paths — the same edges your mart SQL should traverse efficiently.
      </p>
      <div className="relative grid min-h-[220px] gap-3 sm:grid-cols-2 sm:grid-rows-2">
        {nodes.map((n) => {
          const hot = active.from === n.id || active.to === n.id;
          return (
            <div
              key={n.id}
              className={`flex flex-col justify-center rounded-xl border px-4 py-3 font-mono text-sm transition-all duration-500 ${
                hot
                  ? "border-primary bg-primary/10 text-foreground shadow-[0_0_0_1px_hsl(217,91%,40%,0.35)]"
                  : "border-border bg-card/40 text-muted-foreground"
              }`}
            >
              <span className="text-[13px] font-semibold tracking-tight">{n.title}</span>
              <span className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{n.subtitle}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border/80 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Active path:</span>
        <code className="break-all rounded bg-muted px-1.5 py-0.5 text-[11px] text-foreground">{active.caption}</code>
      </div>
    </div>
  );
}
