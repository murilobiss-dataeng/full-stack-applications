import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { CvContent } from "./CvContent";

export const metadata: Metadata = {
  title: "CV · Senior Data Engineer (Snowflake)",
  description:
    "Murilo Biss · CV page and PDF: profile, experience, certifications, education, and languages. Snowflake, dbt, SQL, Python, and enterprise delivery. sigma-sec sections elsewhere are a fictional portfolio demo only.",
};

export default function CvPage() {
  return (
    <PageShell wide className="cv-page-shell pb-20 pt-10 md:pb-24 md:pt-12">
      <CvContent />
    </PageShell>
  );
}

