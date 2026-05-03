"use client";

import Link from "next/link";
import { TabPanel, type TabItem } from "@/components/TabPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelingDiagram } from "./ModelingDiagram";

const diagramTab: TabItem = {
  id: "diagram",
  label: "Live diagram",
  content: <ModelingDiagram />,
};

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

const toolsTab: TabItem = {
  id: "tools",
  label: "Tooling options",
  content: (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-muted-foreground">
        Same logical model can be implemented with different vendors — choose for cost, lock-in, and hiring pool.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Warehouse &amp; SQL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Postgres</strong> (Neon, RDS, AlloyDB) — lowest ops for OLTP-shaped legal
              marts. <strong className="text-foreground">Snowflake / BigQuery / Redshift</strong> when cross-org sharing and
              elastic compute beat egress math.
            </p>
            <p>
              <strong className="text-foreground">dbt</strong> vs <strong className="text-foreground">SQLMesh / Dataform</strong>{" "}
              for declarative transforms; <strong className="text-foreground">Liquibase / Flyway</strong> for imperative DDL
              migrations alongside dbt snapshots.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Lineage &amp; catalog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">OpenLineage</strong> events from the pipeline + dbt artifacts →{" "}
              <strong className="text-foreground">Marquez / DataHub</strong> (OSS) or native Databricks/Snowflake lineage when
              budget allows.
            </p>
            <p>
              API layer: <strong className="text-foreground">Next.js</strong> routes (this app), or{" "}
              <strong className="text-foreground">GraphQL</strong> with DataLoader if many consumers need flexible slices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

const queriesTab: TabItem = {
  id: "queries",
  label: "Example SQL & results",
  content: (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Mart roll-up</CardTitle>
          <CardDescription className="text-xs">Golden entity grain after resolution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-[10px] leading-relaxed text-muted-foreground">
            {`SELECT re.resolved_entity_id,
       re.display_name,
       COUNT(DISTINCT cl.case_id) AS matters,
       AVG(c.outcome = 'win')::float AS win_rate
FROM resolved_entities re
JOIN lawyers l USING (resolved_entity_id)
JOIN case_lawyer cl ON cl.lawyer_id = l.lawyer_id
JOIN cases c ON c.case_id = cl.case_id
GROUP BY 1, 2
ORDER BY matters DESC
LIMIT 4;`}
          </pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Mock result set</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg border border-border bg-background/80 p-3 text-[10px] leading-relaxed text-muted-foreground">
            {` resolved_entity_id | display_name      | matters | win_rate
--------------------+-------------------+---------+----------
 re-001             | J. A. Smith Group |      48 |     0.61
 re-002             | Rivera & Assoc.   |      36 |     0.54
 re-003             | Chen Litigation   |      52 |     0.58
 re-004             | Ortiz Trial Team  |      29 |     0.49`}
          </pre>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Same numbers feed <Link href="/dashboard" className="text-primary underline-offset-4 hover:underline">Dashboard</Link>{" "}
            via <code className="text-foreground">/api/metrics</code> — contract tests should lock column types and row grain.
          </p>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Timeline index probe</CardTitle>
          <CardDescription className="text-xs">B-Tree friendly predicate</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-[10px] leading-relaxed text-muted-foreground">
            {`EXPLAIN (ANALYZE, BUFFERS)
SELECT c.case_id, c.caption, c.filed_at
FROM cases c
WHERE c.court_id = 'SDNY'
  AND c.filed_at >= '2024-01-01'
ORDER BY c.filed_at DESC
LIMIT 50;
-- Expect: Index Scan using idx_cases_court_filed`}
          </pre>
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
  return (
    <TabPanel
      tabs={[diagramTab, schemaTab, designTab, toolsTab, queriesTab, performanceTab]}
      ariaLabel="Data modeling sections"
    />
  );
}
