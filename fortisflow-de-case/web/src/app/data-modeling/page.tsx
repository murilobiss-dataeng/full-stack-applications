import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { ModelingContent } from "./ModelingContent";

export const metadata: Metadata = {
  title: "DW modeling",
  description:
    "sigma-sec demo: dimensional grain, conformed dimensions, bridge tables, and Snowflake-oriented modeling notes for analytics-ready marts.",
};

export default function DataModelingPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Warehouse design"
          title="Analytical modeling for Snowflake marts"
          description="Interviewers want to hear how you choose grain, stabilize conformed dimensions, separate concerns across bronze / silver / gold (or medallion equivalents), and keep joins predictable for analysts. The examples below reuse a compact relational sketch; map the language to your Snowflake schemas, clustering keys, and materialization choices."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <ModelingContent />
      </Reveal>
    </PageShell>
  );
}
