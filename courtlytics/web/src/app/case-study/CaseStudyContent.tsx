"use client";

import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contextTab: TabItem = {
  id: "context",
  label: "Context",
  content: (
    <Card>
      <CardContent className="pt-5 text-sm leading-relaxed text-muted-foreground">
        Vendors disagree on tokens (&quot;Smith, John&quot; vs &quot;J. Smith&quot;). Without resolution, KPIs double-count. Bronze
        keeps every variant; silver normalizes; gold assigns <code className="text-foreground">resolved_entity_id</code>.
      </CardContent>
    </Card>
  ),
};

const strategyTab: TabItem = {
  id: "strategy",
  label: "Strategy",
  content: (
    <Card>
      <CardContent className="pt-5 text-sm leading-relaxed text-muted-foreground">
        Two-pass: cheap exact keys, then fuzzy clustering (SequenceMatcher + unicode NFKC). Confidence flows to the
        warehouse; human-in-the-loop would own edge clusters in production.
      </CardContent>
    </Card>
  ),
};

const tradeTab: TabItem = {
  id: "tradeoffs",
  label: "Trade-offs",
  content: (
    <div className="grid gap-2 md:grid-cols-3">
      {[
        {
          title: "Fuzzy matching",
          body: "Fast to ship; risk over-merge on common names — enrich with bar numbers when possible.",
        },
        {
          title: "Graph",
          body: "Stronger on ambiguity; higher ops cost — defer until graph ROI is clear.",
        },
        {
          title: "Blocking",
          body: "Soundex + state partitions keep pairwise work bounded as volume grows.",
        },
      ].map((c) => (
        <Card key={c.title}>
          <CardHeader className="pb-1 pt-4">
            <CardTitle className="text-sm">{c.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">{c.body}</CardContent>
        </Card>
      ))}
    </div>
  ),
};

const scaleTab: TabItem = {
  id: "scale",
  label: "Scale",
  content: (
    <Card>
      <CardContent className="pt-5 text-sm leading-relaxed text-muted-foreground">
        S3 + columnar silver (Iceberg/Delta), autoscaled Python workers, Postgres for conformed dimensions, columnar
        marts via dbt, stateless API behind CDN with cache keys per mart version.
      </CardContent>
    </Card>
  ),
};

export function CaseStudyContent() {
  return <TabPanel tabs={[contextTab, strategyTab, tradeTab, scaleTab]} ariaLabel="Case study sections" />;
}
