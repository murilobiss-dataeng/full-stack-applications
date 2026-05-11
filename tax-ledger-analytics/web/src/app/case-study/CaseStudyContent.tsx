"use client";

import Link from "next/link";
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
          Imagine three ERP extracts about the <strong className="text-foreground">same supplier</strong> but the name is
          spelled differently on each. If finance or tax simply count rows, they will triple-count exposure, input tax, or
          withholding, and every provision model downstream is wrong.
        </p>
        <p>
          This narrative walks through how teams <strong className="text-foreground">clean names</strong>,{" "}
          <strong className="text-foreground">group likely duplicates</strong>, then{" "}
          <strong className="text-foreground">pick one official counterparty ID</strong> so reporting, compliance, and
          planning all agree on the same grain; the same discipline expected when expanding a{" "}
          <strong className="text-foreground">tax data mart</strong> for a multi-entity group.
        </p>
        <p>
          <Link href="/cv" className="text-primary underline-offset-4 hover:underline">
            Open CV &amp; role fit
          </Link>{" "}
          for how Murilo Biss maps this stack to hands-on delivery (Snowflake, Databricks, dbt, Power BI, Agile partners).
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
        Marketplaces and shared services disagree on tokens (&quot;ACME UK Ltd&quot; vs &quot;Acme Limited&quot;). Without
        resolution, provision and indirect-tax reports double-count. Bronze keeps every variant; silver normalizes; gold
        assigns <code className="text-foreground">resolved_entity_id</code> for marts and BI tools.
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
        Two-pass: cheap exact keys (VAT ID, company registration) where available, then fuzzy clustering on names with
        unicode NFKC. Confidence flows to the warehouse; human-in-the-loop owns edge clusters; the same operating model
        as high-stakes tax master data programs.
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
          body: "Fast to ship; risk over-merge on common names; enrich with hard identifiers when legal entity data exists.",
        },
        {
          title: "Graph MDM",
          body: "Stronger on ambiguity; higher ops cost; defer until graph ROI is clear for your entity universe.",
        },
        {
          title: "Blocking",
          body: "Country + normalized token partitions keep pairwise work bounded as transaction volume grows.",
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
        When the group adds entities or geographies, the <strong className="text-foreground">shape</strong> of the system
        stays the same; only the pipes widen. Below is the same story in pictures anyone in Tax or Finance can follow.
      </p>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Today: one region, nightly extracts</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-[11px] leading-relaxed text-muted-foreground">
            {`   [ ERP + marketplace + payroll files ]
            │   secure transfer / API
            ▼
      +------------------+
      |   Storage (S3)   |  ← "Bronze" copies kept for audit & replay
      +------------------+
            │
            ▼
      +------------------+
      |  Batch compute    |  ← Python / SQL cleans & matches overnight
      |   (small team)    |
      +------------------+
            │
            ▼
      +------------------+
      |    Warehouse     |  ← Official tables Power BI / Sigma read
      +------------------+
            │
            ▼
      +------------------+
      |  Dashboards / API |  ← Tax, planning, FP&A see one story
      +------------------+`}
          </pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Tomorrow: more entities, same arrows</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-[11px] leading-relaxed text-muted-foreground">
            {`   [ Many ledgers + vendors + regulators ]
            │
            ▼
      +------------------+
      |   Bigger lake    |  ← Still one governed landing zone
      |  (columnar)      |
      +------------------+
            │
            ▼
      +------------------+
      | Orchestrated jobs|  ← Airflow / cloud schedulers, idempotent loads
      | (dbt + Spark)    |
      +------------------+
            │
            ▼
      +------------------+
      | Warehouse + marts|  ← Reusable models for tax & finance KPIs
      +------------------+
            │
            ▼
      +------------------+
      | API + semantic    |  ← Self-service with row-level controls
      +------------------+`}
          </pre>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Takeaway:</strong> you are not redesigning from scratch; you are widening
            pipes, hardening tests, and clarifying ownership. Costs stay predictable while trust in headline numbers goes
            up; exactly what hiring managers describe for data-mart expansion roles.
          </p>
        </CardContent>
      </Card>
      <Card className="border-dashed border-primary/40 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">What changes for non-technical readers?</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ol className="list-inside list-decimal space-y-2">
            <li>Provision and flash reports refresh on a schedule you can see, not mystery spreadsheets.</li>
            <li>When a feed breaks, alerts fire before leadership reads a wrong chart.</li>
            <li>Every metric traces to a batch, a model version, and a control; essential for audits and controversy work.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  ),
};

export function CaseStudyContent() {
  return <TabPanel tabs={[plainTab, contextTab, strategyTab, tradeTab, scaleTab]} ariaLabel="Narrative sections" />;
}
