"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Step = {
  id: string;
  title: string;
  detail: string;
  artifact: string;
  risk: string;
};

const steps: Step[] = [
  {
    id: "raw",
    title: "1. Bronze: partner / order feeds",
    detail: "Immutable FortisFlow marketplace payloads land with batch_id. POS, OMS, and tax-relevant adjustments may differ by vendor.",
    artifact: "s3://raw/doorrush/partner_feed_batch_009.json",
    risk: "Duplicate webhook delivery → idempotent writer required or double rows downstream.",
  },
  {
    id: "staging",
    title: "2. Silver: normalized merchants",
    detail: "Unicode NFKC, trimmed names, duplicate flags. Still multiple source IDs per same merchant legal entity.",
    artifact: "partners_staging_009.json (name_canonical, dup_group_hint)",
    risk: "Threshold drift on fuzzy flags → monitor cluster size distribution.",
  },
  {
    id: "curated",
    title: "3. Gold: resolved merchants",
    detail: "Union-find merge; each row gets resolved_entity_id + confidence for tax and payout joins.",
    artifact: "partners_curated_009.json",
    risk: "Over-merge on common trading names → VAT ID / Companies House gate or human review queue.",
  },
  {
    id: "warehouse",
    title: "4. Warehouse load",
    detail: "Upsert into Postgres (demo tables map partners ↔ orders); FK checks enforce referential closure.",
    artifact: "INSERT … ON CONFLICT (partner_source_id) DO UPDATE",
    risk: "Partial load leaves FK broken → wrap in transaction; quarantine failed subset.",
  },
  {
    id: "dbt",
    title: "5. dbt marts",
    detail: "Mart SQL rolls order counts, on-time rates, and hub KPIs at golden merchant grain.",
    artifact: "ref('partner_metrics') passing unique + relationship tests",
    risk: "Mart passes tests but stale snapshot → version marts with run_id in API.",
  },
  {
    id: "api",
    title: "6. Curated API",
    detail: "GET /api/metrics serves JSON from published marts; BI never reads raw landing tables.",
    artifact: '{ "partnerPerformance": [ … ], "batchId": "doorrush-demo-uk-42" }',
    risk: "Schema drift vs UI → contract tests + validation on the route.",
  },
];

export function TruthJourneySim() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((x) => (x + 1) % steps.length), 2200);
    return () => window.clearInterval(t);
  }, []);

  const current = steps[i];

  return (
    <div className="space-y-4">
      <Card className="border-primary/25 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Lineage: raw → API (FortisFlow golden path)</CardTitle>
          <CardDescription className="text-xs">
            Simulation: highlights advance automatically to show custody of data and where things break in real life.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <pre className="overflow-x-auto rounded-lg border border-border bg-background/80 p-3 text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
            {`partner_vendor_feed.json (bronze)
   │ normalize + dedupe flags
   ▼
partners_staging_*.json
   │ entity_resolution (fuzzy + rules)
   ▼
partners_curated_*.json  ──►  Postgres (partners / hubs / orders / order_partner)
                                    │
                                    ▼
                              dbt marts (partner_metrics, …)
                                    │
                                    ▼
                              GET /api/metrics  ──►  Dashboard`}
          </pre>
          <div className="flex flex-wrap gap-1.5">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setI(idx)}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                  idx === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {idx + 1}. {s.id}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{current.title}</CardTitle>
          <CardDescription className="text-xs leading-relaxed">{current.detail}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div>
            <p className="font-medium text-muted-foreground">Artifact</p>
            <code className="mt-1 block rounded-md border border-border bg-muted/40 p-2 text-[11px] text-foreground">
              {current.artifact}
            </code>
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-muted-foreground">
            <span className="font-semibold text-amber-900">What can go wrong: </span>
            {current.risk}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
