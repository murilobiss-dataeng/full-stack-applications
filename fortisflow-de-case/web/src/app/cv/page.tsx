import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CvContent } from "./CvContent";

export const metadata: Metadata = {
  title: "CV · Senior Data Engineer (Snowflake)",
  description:
    "Murilo Biss · CV page and PDF: profile, experience, certifications, education, and languages. Snowflake, dbt, SQL, Python, and enterprise delivery. sigma-sec sections elsewhere are a fictional portfolio demo only.",
};

export default function CvPage() {
  return (
    <PageShell wide className="pb-16 pt-8 md:pb-20 md:pt-10">
      <Reveal>
        <CvContent />
      </Reveal>
    </PageShell>
  );
}

