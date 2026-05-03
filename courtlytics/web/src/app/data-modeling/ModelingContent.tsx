"use client";

import Link from "next/link";
import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tables: { name: string; body: string }[] = [
  {
    name: "lawyers",
    body: "PK lawyer_id; resolved_entity_id, name_canonical; indexes for golden joins and search.",
  },
  {
    name: "courts",
    body: "PK court_id; index (state_code, tier) for regional rollups.",
  },
  {
    name: "cases",
    body: "PK case_id; FK court_id; index (court_id, filed_at DESC) for venue timelines.",
  },
  {
    name: "case_lawyer",
    body: "Composite PK (case_id, lawyer_id, role); FK cascades; bridge for counsel roles.",
  },
];

const schemaTab: TabItem = {
  id: "tables",
  label: "Tables",
  content: (
    <div className="grid gap-2 sm:grid-cols-2">
      {tables.map((t) => (
        <Card key={t.name} className="transition-colors hover:border-[hsl(217,33%,24%)]">
          <CardHeader className="pb-1 pt-4">
            <CardTitle className="font-mono text-sm">{t.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">{t.body}</CardContent>
        </Card>
      ))}
    </div>
  ),
};

const designTab: TabItem = {
  id: "design",
  label: "Design",
  content: (
    <div className="space-y-3">
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Normalization</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          Conformed dimensions for courts and lawyers; case outcomes on facts with DATE types for deterministic windows.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Keys & integrity</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          <code className="text-foreground">case_lawyer</code> enforces real edges; ON DELETE CASCADE avoids orphan links on sandbox rollback.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Query path</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          EXPLAIN on SDNY timelines should hit idx on court + filed_at. Heavy marts from dbt (
          <code className="text-foreground">src/dbt/models/lawyer_metrics.sql</code>) keep dashboards off raw joins.
        </CardContent>
      </Card>
    </div>
  ),
};

const performanceTab: TabItem = {
  id: "performance",
  label: "Performance",
  content: (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Indexes</CardTitle>
          <CardDescription className="text-xs">B-Tree for filters; GIN / trigram only where search demands it</CardDescription>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1.5">
            <li>
              <strong className="text-foreground">B-Tree</strong> on foreign keys used in joins and on range columns (
              <code className="text-foreground">filed_at DESC</code>) keeps timeline queries index-only where possible.
            </li>
            <li>
              <strong className="text-foreground">GIN + pg_trgm</strong> for fuzzy lawyer name search — add after measuring
              sequential scans; every extra index slows writes.
            </li>
            <li>
              <strong className="text-foreground">Covering indexes</strong> (INCLUDE) for hot read paths that power the
              dashboard — trade storage for fewer heap fetches.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Query discipline</CardTitle>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          Push heavy rollups to dbt marts; cap ORM N+1 patterns in the API; run{" "}
          <code className="text-foreground">EXPLAIN (ANALYZE, BUFFERS)</code> on the slowest three queries monthly. For
          cost and governance context (RLS, classification), see{" "}
          <Link href="/governance" className="text-primary underline-offset-4 hover:underline">
            Governance
          </Link>
          .
        </CardContent>
      </Card>
    </div>
  ),
};

export function ModelingContent() {
  return <TabPanel tabs={[schemaTab, designTab, performanceTab]} ariaLabel="Data modeling sections" />;
}
