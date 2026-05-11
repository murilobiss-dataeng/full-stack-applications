import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { PrepContent } from "./PrepContent";

export const metadata: Metadata = {
  title: "PM call prep · Snowflake Senior Data Engineer",
  description:
    "Murilo Biss · structured prep for the Project Manager interview: Snowflake performance and cost, DW design, data quality, regulated-industry posture, and stack alignment (Sigma Software / full-remote context).",
};

export default function PrepPage() {
  return (
    <PageShell wide className="pb-16 pt-8 md:pb-20 md:pt-10">
      <Reveal>
        <PrepContent />
      </Reveal>
    </PageShell>
  );
}
