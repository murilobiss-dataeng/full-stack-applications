import type { Metadata } from "next";
import { CaseStudyContent } from "./CaseStudyContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Case Study",
  description: "Case study: duplicate legal data, entity resolution, and scaling a clean–structured–connected path.",
};

export default function CaseStudyPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Narrative"
          title="Case study"
          description="Lawyer-level KPIs when upstream systems disagree on identity — how clean inputs, structured marts, and connected IDs carry the story from chaos to governed metrics."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <CaseStudyContent />
      </Reveal>
    </PageShell>
  );
}
