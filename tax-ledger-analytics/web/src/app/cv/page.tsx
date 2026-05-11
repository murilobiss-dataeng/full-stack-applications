import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CvContent } from "./CvContent";

export const metadata: Metadata = {
  title: "CV & Analytics profile",
  description:
    "Murilo Biss — CV (PDF), visual role fit for Analytics Engineering: metrics, dbt, SQL, BI, and DoorRush portfolio.",
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
