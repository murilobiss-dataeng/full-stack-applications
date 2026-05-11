import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CvContent } from "./CvContent";

export const metadata: Metadata = {
  title: "CV & why Analytics Engineering",
  description:
    "Murilo Biss — CV (PDF), explicit hiring case for Analytics Engineering roles: semantic marts, dbt, SQL, governed metrics, BI hand-off, and cross-team delivery.",
};

export default function CvPage() {
  return (
    <PageShell className="pb-16 pt-10 md:pb-20 md:pt-12">
      <Reveal>
        <CvContent />
      </Reveal>
    </PageShell>
  );
}
