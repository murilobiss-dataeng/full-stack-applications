import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CvContent } from "./CvContent";

export const metadata: Metadata = {
  title: "CV · visualization, Analytics Engineering, and product",
  description:
    "Murilo Biss · CV (PDF) and on-page role fit: data visualization, Analytics Engineering, Data Engineering, and Product Owner experience (including HSBC); Snowflake, dbt, Power BI, SQL, AWS Certified Cloud Practitioner, and the DoorRush demo portfolio.",
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
