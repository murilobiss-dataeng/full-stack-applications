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
    name: "suppliers",
    body: "PK supplier_id; resolved_entity_id, name_canonical; indexes for golden joins and legal-name search.",
  },
  {
    name: "plants",
    body: "PK plant_id; index (region_code, tier) for regional rollups.",
  },
  {
    name: "work_orders",
    body: "PK work_order_id; FK plant_id; index (plant_id, requested_at DESC) for production SLA timelines.",
  },
  {
    name: "work_order_supplier",
    body: "Composite PK (work_order_id, supplier_id, role); FK cascades; bridge for production supply roles.",
  },
];

const schemaTab: TabItem = {
  id: "tables",
  label: "Tables",
  content: (
    <div className="grid gap-2 sm:grid-cols-2">
      {tables.map((t) => (
        <Card key={t.name} className="transition-colors hover:border-primary/20">
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
          Conformed dimensions for plants and suppliers; work order status on facts with DATE types for deterministic windows.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Keys & integrity</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          <code className="text-foreground">work_order_supplier</code> enforces real edges; ON DELETE CASCADE avoids orphan links on sandbox rollback.
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-sm">Query path</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          EXPLAIN on London plant timelines should hit idx on plant + requested_at. Heavy marts from dbt (
          <code className="text-foreground">src/dbt/models/supplier_metrics.sql</code>) keep dashboards off raw joins.
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
        Same logical model can be implemented with different vendors; choose for cost, lock-in, and hiring pool.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Warehouse &amp; SQL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Snowflake</strong> is the default analytical plane in many tax and finance
              programs: separate compute/warehouse, time travel for replay, native stages and tasks for incremental loads,
              Streams for CDC-style capture, Dynamic Tables or dbt incremental models for marts, and row access policies for
              tenant-safe self-service. Result cache and clustering keys matter once Power BI or Sigma workbook fan-out grows.
            </p>
            <p>
              <strong className="text-foreground">Postgres</strong> (Neon, RDS, AlloyDB) stays useful for app OLTP, local
              fixtures, or small sandboxes; the same dbt project often targets Snowflake in prod and Postgres in CI with slim
              seeds.
            </p>
            <p>
              <strong className="text-foreground">dbt</strong> on Snowflake (or <strong className="text-foreground">SQLMesh</strong> /{" "}
              <strong className="text-foreground">Dataform</strong>) for declarative transforms;{" "}
              <strong className="text-foreground">Liquibase</strong> / <strong className="text-foreground">Flyway</strong> when you need imperative
              DDL outside dbt snapshots.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Lineage &amp; catalog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">OpenLineage</strong> events from the pipeline plus dbt artifacts into{" "}
              <strong className="text-foreground">Marquez</strong> or <strong className="text-foreground">DataHub</strong> (OSS), or use{" "}
              <strong className="text-foreground">Snowflake</strong> native lineage and object dependencies in Access History when
              budget favors fewer moving parts.
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
       COUNT(DISTINCT wos.work_order_id) AS work_orders,
       AVG(wo.status = 'produced')::float AS produced_rate
FROM resolved_entities re
JOIN suppliers s USING (resolved_entity_id)
JOIN work_order_supplier wos ON wos.supplier_id = s.supplier_id
JOIN work_orders wo ON wo.work_order_id = wos.work_order_id
GROUP BY 1, 2
ORDER BY work_orders DESC
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
            {` resolved_entity_id | display_name      | work_orders | produced_rate
--------------------+-------------------+--------------+---------------
re-001             | J. A. Smith Group |           48 |          0.61
re-002             | Rivera & Assoc.   |           36 |          0.54
re-003             | Chen Catering     |           52 |          0.58
re-004             | Ortiz Kitchens    |           29 |          0.49`}
          </pre>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Same numbers feed <Link href="/dashboard" className="text-primary underline-offset-4 hover:underline">Dashboard</Link>{" "}
            via <code className="text-foreground">/api/metrics</code>; contract tests should lock column types and row grain.
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
SELECT wo.work_order_id, wo.work_order_ref, wo.requested_at
FROM work_orders wo
WHERE wo.plant_id = 'P-LON-01'
  AND wo.requested_at >= '2024-01-01'
ORDER BY wo.requested_at DESC
LIMIT 50;
-- Expect: Index Scan using idx_work_orders_plant_requested`}
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
          <CardDescription className="text-xs">
            Postgres-shaped patterns for local CI; production Snowflake uses clustering keys and search optimization instead of
            B-Tree wording, but the join discipline is the same.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1.5">
            <li>
              <strong className="text-foreground">B-Tree</strong> on foreign keys used in joins and on range columns (
              <code className="text-foreground">requested_at DESC</code>) keeps work-order timelines index-friendly where possible.
            </li>
            <li>
              <strong className="text-foreground">GIN + pg_trgm</strong> for fuzzy supplier legal-name search; add after measuring
              sequential scans; every extra index slows writes.
            </li>
            <li>
              <strong className="text-foreground">Covering indexes</strong> (INCLUDE) for hot read paths that power the
              dashboard; trade storage for fewer heap fetches.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Snowflake rollups</CardTitle>
          <CardDescription className="text-xs">Warehouse-native performance habits</CardDescription>
        </CardHeader>
        <CardContent className="text-xs leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1.5">
            <li>
              Define clustering keys on large facts (for example <code className="text-foreground">plant_id</code>,{" "}
              <code className="text-foreground">requested_date</code>) so selective analytics queries prune micro-partitions.
            </li>
            <li>
              Materialized marts as Dynamic Tables or incremental dbt models; use warehouse auto-suspend and query acceleration
              where the workbook concurrency justifies it.
            </li>
            <li>
              Use <code className="text-foreground">QUERY_TAG</code> from dbt or the semantic layer so Snowflake access history
              lines up with dashboard tiles and compliance release batches.
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
          cost and definitions context (metric owners, semantic contracts), see{" "}
          <Link href="/source-of-truth" className="text-primary underline-offset-4 hover:underline">
            Metric truth
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
