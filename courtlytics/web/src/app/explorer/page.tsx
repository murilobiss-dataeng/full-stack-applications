import type { Metadata } from "next";
import { RepoExplorer } from "./RepoExplorer";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Repo explorer",
  description: "Browse the Courtlytics monorepo layout — data-platform and web — in a GitHub-style file tree.",
};

export default function ExplorerPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          kicker="Data engineering"
          title="Repository explorer"
          description="Navigate folders like on GitHub: open data-platform for ingestion, processing, pipeline, dbt, and tests; open web for the Next.js app. File clicks show a short engineering note and sample snippets."
        />
      </Reveal>
      <Reveal delayMs={80} className="mt-6">
        <RepoExplorer />
      </Reveal>
    </PageShell>
  );
}
