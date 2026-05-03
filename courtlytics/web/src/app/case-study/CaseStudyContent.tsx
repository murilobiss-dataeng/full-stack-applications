"use client";

import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const plainTab: TabItem = {
  id: "plain",
  label: "Plain English",
  content: (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">What problem are we solving?</CardTitle>
        <CardDescription className="text-sm">No jargon version</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          Imagine three spreadsheets about the <strong className="text-foreground">same lawyer</strong> but the name is
          written differently on each. If you simply count rows, you will count that person three times. That makes every
          chart — win rate, workload, revenue — wrong.
        </p>
        <p>
          The case study walks through how we <strong className="text-foreground">clean names</strong>,{" "}
          <strong className="text-foreground">group likely duplicates</strong>, then{" "}
          <strong className="text-foreground">pick one official ID</strong> so the whole company agrees on who is who.
        </p>
      </CardContent>
    </Card>
  ),
};

const contextTab: TabItem = {
  id: "context",
  label: "Context",
  content: (
    <Card>
      <CardContent className="pt-5 text-sm leading-relaxed text-muted-foreground">
        Vendors disagree on tokens (&quot;Smith, John&quot; vs &quot;J. Smith&quot;). Without resolution, KPIs double-count.
        Bronze keeps every variant; silver normalizes; gold assigns <code className="text-foreground">resolved_entity_id</code>.
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
  label: "Scale (picture it)",
  content: (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-muted-foreground">
        When the company grows, the <strong className="text-foreground">shape</strong> of the system stays the same — only
        the boxes get bigger or multiply. Below is the same story in pictures anyone can follow.
      </p>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Today — one team, nightly files</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-[11px] leading-relaxed text-muted-foreground">
            {`   [ Law firms / courts ]
            │   upload files / API
            ▼
      +------------------+
      |   Storage (S3)   |  ← "Bronze" copies kept forever for audit
      +------------------+
            │
            ▼
      +------------------+
      |  Small compute   |  ← Python cleans & matches overnight
      |   (1–2 people)   |
      +------------------+
            │
            ▼
      +------------------+
      |    Database      |  ← Official tables dashboards read
      +------------------+
            │
            ▼
      +------------------+
      |  Website / API   |  ← Lawyers & finance see charts
      +------------------+`}
          </pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Tomorrow — more data, same arrows</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-[11px] leading-relaxed text-muted-foreground">
            {`   [ Many vendors + internal CRM ]
            │
            ▼
      +------------------+
      |   Bigger lake    |  ← Still one place for raw truth
      |  (columnar)      |
      +------------------+
            │
            ▼
      +------------------+
      | Autoscaled jobs  |  ← Same Python logic, more machines
      | (queue / cloud)  |
      +------------------+
            │
            ▼
      +------------------+
      | Warehouse + BI   |  ← Still one official "golden" layer
      +------------------+
            │
            ▼
      +------------------+
      | API + cache      |  ← Fast for apps; data still curated
      +------------------+`}
          </pre>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Takeaway:</strong> you are not redesigning from scratch — you are widening
            pipes and automating schedules. That is how costs stay predictable while trust in numbers goes up.
          </p>
        </CardContent>
      </Card>
      <Card className="border-dashed border-primary/40 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">What changes for non-technical readers?</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ol className="list-inside list-decimal space-y-2">
            <li>Reports update on a schedule you can see (e.g. every morning at 6).</li>
            <li>When something breaks, you get a clear alert — not silent wrong charts.</li>
            <li>Every number can be traced back to a file and a version — important for disputes and audits.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  ),
};

export function CaseStudyContent() {
  return <TabPanel tabs={[plainTab, contextTab, strategyTab, tradeTab, scaleTab]} ariaLabel="Case study sections" />;
}
