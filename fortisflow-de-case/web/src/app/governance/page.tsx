import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { GovernanceContent } from "./GovernanceContent";

export const metadata: Metadata = {
  title: "Quality & governance",
  description:
    "sigma-sec demo: contracts, lineage, RBAC patterns, observability, and audit-ready controls aligned with Snowflake-heavy Senior Data Engineer interviews.",
};

export default function GovernancePage() {
  return (
    <PageShell wide>
      <Reveal>
        <PageHeader
          kicker="Enterprise posture"
          title="Data quality, access control, and lineage"
          description="Regulated clients reward engineers who treat governance as shipping criteria: documented contracts, tests that block bad deploys, row access policies and masking where needed, and lineage that survives audits. This tabbed walkthrough complements the pipeline and modeling routes with the non-functional story interviewers weight heavily."
        />
      </Reveal>
      <Reveal delayMs={60}>
        <GovernanceContent />
      </Reveal>
    </PageShell>
  );
}
