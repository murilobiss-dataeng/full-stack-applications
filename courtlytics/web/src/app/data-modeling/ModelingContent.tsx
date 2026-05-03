"use client";

import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export function ModelingContent() {
  return <TabPanel tabs={[schemaTab, designTab]} ariaLabel="Data modeling sections" />;
}
