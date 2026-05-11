import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CvContent } from "./CvContent";

export const metadata: Metadata = {
  title: "CV · visualization, Analytics Engineering, and product",
  description:
    "Murilo Biss · CV page and PDF: same profile, experience, certifications, education, and languages; Snowflake, dbt, Power BI, SQL, AWS Certified Cloud Practitioner. DoorRush sections elsewhere are a portfolio demo only.",
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
