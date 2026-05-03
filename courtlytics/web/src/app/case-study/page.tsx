import type { Metadata } from "next";
import { CaseStudyContent } from "./CaseStudyContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Case Study",
  description:
    "Plain-English problem framing, strategy, trade-offs, and illustrated scaling story for non-engineering readers.",
};

export default function CaseStudyPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Narrative"
          title="Case study"
          description="Same technical story in two voices: plain English first, then detail — including picture-style diagrams for how the system grows."
        />
      </Reveal>
      <Reveal delayMs={80}>
        <CaseStudyContent />
      </Reveal>
    </PageShell>
  );
}
