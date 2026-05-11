/**
 * Static tree mirroring the FortisFlow portfolio monorepo for the GitHub-style explorer.
 * Paths are segments from the repository root (`tax-analytics`; portfolio folder may still be `tax-ledger-analytics` on disk).
 */

export type RepoNode = {
  name: string;
  type: "dir" | "file";
  /** One-line summary in the file list */
  commitHint?: string;
  /** Blob panel: markdown or plain description */
  description?: string;
  /** Optional fenced preview (not always full source) */
  sample?: string;
  children?: RepoNode[];
};

function f(
  name: string,
  commitHint: string,
  extra?: Partial<Pick<RepoNode, "description" | "sample">>,
): RepoNode {
  return { name, type: "file", commitHint, ...extra };
}

function d(name: string, commitHint: string, children: RepoNode[]): RepoNode {
  return { name, type: "dir", commitHint, children };
}

export const repoRoot: RepoNode = d("tax-analytics", "Portfolio monorepo", [
  f("README.md", "docs: project overview", {
    description: "FortisFlow: Snowflake-centric Data Engineering portfolio — ELT, DW layers, governance, Next.js case site (Murilo Biss).",
    sample: `# FortisFlow\n\nEnterprise DW and pipeline optimization portfolio`,
  }),
  d("infra", "feat: IaC + containers", [
    f("README.md", "docs: infra layout", { description: "Terraform stubs, Docker Compose for local Postgres, pipeline Dockerfile." }),
    f("docker-compose.yml", "chore: local postgres", { description: "Postgres 16 on port 5433 for integration tests." }),
    d("terraform", "feat: aws outline", [
      f("main.tf", "chore: tf root", { description: "Minimal terraform block; commented examples for S3/KMS/IAM." }),
      f("iam-outline.tf", "docs: roles", { description: "Permission notes for pipeline vs analyst principals." }),
    ]),
    d("docker", "chore: etl image", [
      f("Dockerfile.pipeline", "docker: batch", { description: "Build context = data-platform; CMD python -m src.pipeline." }),
    ]),
  ]),
  d(
    "data-platform",
    "feat: pipeline + dbt layout",
    [
      f("requirements.txt", "chore: deps", {
        description: "Runtime deps for local ETL and pytest.",
        sample: "pytest>=8.0.0\npython-dotenv>=1.0.0",
      }),
      f("pytest.ini", "chore: pytest paths", {
        description: "Sets `pythonpath` so `src.*` imports resolve in tests.",
        sample: "[pytest]\npythonpath = .\ntestpaths = tests",
      }),
      f("README.md", "docs: data platform", {
        description: "How to run the pipeline, env vars (`TAX_LEDGER_DATA_ROOT`), and zone layout.",
      }),
      d("data", "chore: sample zones", [
        d("raw", "data: FortisFlow demo feeds", [
          f("partner_vendor_feed.json", "data: bronze partner feed", {
            description: "Demo rows (John Smith / J. Smith): FortisFlow partner legal names before ETL.",
            sample: '{ "records": [ { "partner_id": "P001", "full_name": "John Smith" }, ... ] }',
          }),
          f("hubs.json", "data: hubs", { description: "City / region hub dimension (FortisFlow UK hubs)." }),
          f("orders.json", "data: orders", { description: "Order-level mock facts linked to hubs." }),
          f("order_partner.json", "data: bridge", { description: "Order ↔ partner allocation bridge for warehouse FK demos." }),
        ]),
        d("processed", "etl: staging outputs", [
          f("partners_staging_*.json", "etl: staging batch", {
            description: "Written by `run_partner_pipeline`; normalized + dedupe flags.",
          }),
        ]),
        d("curated", "etl: golden-ready", [
          f("partners_curated_*.json", "etl: resolved entities", {
            description: "Includes `resolved_entity_id` and confidence for each row.",
          }),
        ]),
      ]),
      d("contracts", "feat: data contracts", [
          f("raw_partner.schema.json", "docs: JSON Schema", {
            description: "Validates raw partner_vendor_feed.records before ETL.",
          }),
      ]),
      d("src", "refactor: package layout", [
        d("ingestion", "feat: raw landing", [
          f("api_ingestion.py", "feat: API → raw zone", {
            description: "Simulates webhook/API payloads persisted under `data/raw` with batch IDs.",
            sample: "def ingest_payload_to_raw(payload, *, raw_dir, resource, batch_id) -> Path:",
          }),
          f("file_ingestion.py", "feat: batch JSON copy", {
            description: "Batch file drops into the raw zone (S3 analog).",
          }),
          f("__init__.py", "chore: package export", {}),
        ]),
        d("processing", "feat: entity resolution", [
          f("normalization.py", "feat: NFKC + names", {
            description: "Canonical strings before fuzzy matching.",
          }),
          f("deduplication.py", "feat: union-find dupes", {
            description: "Similarity-based duplicate groups for QA flags.",
          }),
          f("entity_resolution.py", "feat: golden clusters", {
            description: "Assigns `resolved_entity_id` via SequenceMatcher + token boosts.",
          }),
          f("__init__.py", "chore: package export", {}),
        ]),
        d("pipeline", "feat: ETL orchestration", [
          f("etl_pipeline.py", "feat: raw → curated", {
            description: "Runs validation, normalization, dedupe, resolution; writes staging + curated JSON.",
            sample: "def run_partner_pipeline(*, batch_id, data_root) -> dict:",
          }),
          f("__main__.py", "chore: CLI entry", { description: "Run with `python -m src.pipeline` from `data-platform/`." }),
          f("__init__.py", "chore: package export", {}),
        ]),
        d("database", "docs: warehouse DDL", [
          f("models.py", "docs: SQL DDL strings", {
            description: "partners, hubs, orders, order_partner, resolved_entities, ingestion_batch + indexes.",
          }),
          f("postgres_client.py", "feat: simulated PG", {
            description: "In-memory warehouse for demos; swap for psycopg in production.",
          }),
          f("__init__.py", "chore: package export", {}),
        ]),
        d("utils", "feat: config + logging", [
          f("config.py", "feat: env settings", { description: "`DOORRUSH_DATA_ROOT` or `TAX_ANALYTICS_DATA_ROOT` (legacy `TAX_LEDGER_DATA_ROOT`), `LOG_LEVEL`, `ETL_BATCH_ID`." }),
          f("logger.py", "feat: JSON logs", { description: "Structured logs for batch_id, stage, duration_ms." }),
          f("__init__.py", "chore: package export", {}),
        ]),
        d("dbt", "feat: dbt project under src", [
          f("dbt_project.yml", "chore: dbt project", {
            description: "`tax_analytics` dbt project: model-paths, seed-paths, test-paths.",
          }),
          f("__init__.py", "chore: package marker", {}),
          d("seeds", "data: warehouse slice", [
            f("partners_seed.csv", "seed: partners", {}),
            f("hubs_seed.csv", "seed: hubs", {}),
            f("orders_seed.csv", "seed: orders", {}),
            f("order_partner_seed.csv", "seed: bridge", {}),
          ]),
          d("models", "feat: core + marts", [
            f("partners.sql", "sql: core", {}),
            f("hubs.sql", "sql: core", {}),
            f("orders.sql", "sql: core", {}),
            f("order_partner.sql", "sql: core", {}),
            f("partner_metrics.sql", "sql: mart", { description: "Refs partners, order_partner, orders." }),
            f("hub_aggregations.sql", "sql: mart", {}),
            f("schema.yml", "test: yaml", { description: "Relationships + not_null across core and marts." }),
          ]),
          d("tests", "test: singular", [
            f("assert_order_partner_grain.sql", "test: grain", { description: "No duplicate bridge keys." }),
          ]),
        ]),
        f("__init__.py", "chore: tax-analytics package", { description: "Marks `src` as a Python package." }),
      ]),
      d("tests", "test: pytest coverage", [
        f("test_normalization.py", "test: strings", {}),
        f("test_deduplication.py", "test: dup groups", {}),
        f("test_pipeline.py", "test: ETL IO", {}),
        f("test_database_ddl.py", "test: ddl", { description: "Asserts DDL bundle includes meta tables." }),
      ]),
    ],
  ),
  d("web", "feat: Next.js 14 UI", [
    f("package.json", "chore: tax-analytics-web", {
      description: "Next.js app dependencies and scripts (`dev`, `build`, `start`).",
      sample: '{ "name": "tax-analytics-web", "dependencies": { "next": "14.2.18", ... } }',
    }),
    f("next.config.mjs", "chore: next config", {}),
    d("src", "refactor: app router", [
      d("app", "feat: routes + API", [
        f("page.tsx", "ui: home", { description: "FortisFlow narrative; AE + DV positioning; CV + marts links." }),
        d("cv", "feat: application packet", [
          f("page.tsx", "ui: CV shell", { description: "Metadata + PageShell wrapper." }),
          f("CvContent.tsx", "ui: CV + visual pitch", { description: "Hero KPI tiles, stack bars, role-fit grid, timeline; no certs or education blocks." }),
        ]),
        f("method/page.tsx", "redirect: legacy", {
          description: "Redirects to /; standalone methodology route removed (Data Analyst framing).",
        }),
        d("infrastructure", "feat: merged platform hub", [
          f("page.tsx", "ui: Marts hub", { description: "NavRail: repo explorer, marts & pipelines, modeling (AE scope)." }),
          f("InfrastructureHubClient.tsx", "ui: NavRail", {}),
        ]),
        d("governance", "feat: trust & TCO (embedded)", [
          f("page.tsx", "redirect", { description: "→ /source-of-truth (governance narrative lives there)" }),
          f("GovernanceContent.tsx", "ui: tab body", {
            description: "Executive charter, security, IAM, IaC tab, DQ, orchestration, cost scenarios.",
          }),
        ]),
        d("ai-lab", "feat: AI simulation", [
          f("page.tsx", "ui: AI lab", { description: "Simulated assistant over /api/metrics; demo only." }),
          f("AiLabClient.tsx", "ui: prompt UX", { description: "Client-side typing + structured answer from live mock API." }),
        ]),
        f("layout.tsx", "ui: shell + metadata", {}),
        d("api", "feat: route handlers", [
          d("metrics", "api: mock marts", [
            f("route.ts", "api: GET metrics", { description: "JSON for Recharts dashboard." }),
          ]),
        ]),
      ]),
    ]),
  ]),
]);

export function navigateToPath(segments: string[]): RepoNode | null {
  let node: RepoNode = repoRoot;
  for (const seg of segments) {
    const next = node.children?.find((c) => c.name === seg);
    if (!next || next.type !== "dir") return null;
    node = next;
  }
  return node;
}

export function listDirectory(segments: string[]): RepoNode[] {
  const node = navigateToPath(segments);
  return node?.children ?? [];
}
