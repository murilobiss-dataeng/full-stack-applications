import Link from "next/link";
import { ArrowRight, BarChart2, LineChart, Presentation } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Metric truth hub: definitions and API are scaffold; data visualization is where value is shown.
 */
export function TruthVisualizationPanel() {
  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-primary/[0.04]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">What you prove on top of the stack</CardTitle>
          <CardDescription className="text-xs leading-relaxed">
            Grain, lineage, and contracts (tabs to the left) are the <strong className="text-foreground">ready structure</strong>. Data
            visualization is how stakeholders <strong className="text-foreground">see trust</strong>: same numbers in the API, in decks, and in
            tools like Power BI, Tableau, or Sigma, without ad-hoc SQL.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link href="/dashboard" className={cn(buttonVariants(), "text-sm")}>
            Open BI surface
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link href="/api/metrics" className={cn(buttonVariants({ variant: "outline" }), "text-sm")} target="_blank" rel="noreferrer">
            Raw metrics JSON
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: LineChart,
            title: "Trends & thresholds",
            body: "Encode the definition once; show movement and exceptions so finance and ops agree on what “bad” looks like.",
          },
          {
            icon: BarChart2,
            title: "Mix & contribution",
            body: "Part-to-whole and ranking views make policy trade-offs visible, still bound to mart grain, not spreadsheet pivots.",
          },
          {
            icon: Presentation,
            title: "Executive read",
            body: "One page with lineage footnote, chart, and metric owner, the package recruiters and sponsors recognize as DV impact.",
          },
        ].map(({ icon: Icon, title, body }) => (
          <Card key={title}>
            <CardHeader className="pb-1">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-muted-foreground">{body}</CardContent>
          </Card>
        ))}
      </div>

      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-3 font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
        {`  [ Marts hub: pipelines + models ]     [ Metric truth: grain + API ]
              │                                        │
              └──────────────────┬─────────────────────┘
                                 ▼
                    [ Data visualization / BI surface ]
                    charts ← same contract → decisions`}
      </pre>
    </div>
  );
}
