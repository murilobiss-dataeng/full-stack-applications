import type { Metadata } from "next";
import { ModelingContent } from "./ModelingContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Data Modeling",
  description:
    "PostgreSQL schema, integrity, B-Tree vs GIN indexing, and query paths for analytics — structured layer of the stack.",
};

export default function DataModelingPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Warehouse"
          title="PostgreSQL modeling"
          description="The structured pillar: 3NF entities, bridge tables, B-Tree vs GIN strategy, EXPLAIN discipline, and indexes aligned to dashboard predicates and dbt marts."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <ModelingContent />
      </Reveal>
    </PageShell>
  );
}
