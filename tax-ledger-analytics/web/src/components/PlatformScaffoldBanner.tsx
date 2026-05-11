import Link from "next/link";
import { BarChart3, Layers } from "lucide-react";

type PlatformScaffoldBannerProps = {
  /** One line: what this route demonstrates on top of the shared stack */
  focus: string;
};

/**
 * Shared callout: the repo already implements pipelines, contracts, and API boundaries.
 * The hire signal is how that foundation becomes visuals and decisions (data visualization and narrative).
 */
export function PlatformScaffoldBanner({ focus }: PlatformScaffoldBannerProps) {
  return (
    <aside
      className="flex flex-col gap-3 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] to-transparent px-4 py-4 sm:flex-row sm:items-start sm:gap-4 sm:px-5"
      aria-label="Portfolio scaffold"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Layers className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 space-y-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        <p className="font-semibold text-foreground">
          Ready-made portfolio stack: you add visualization and narrative
        </p>
        <p>
          Ingest zones, warehouse DDL, dbt-style tests, and <code className="rounded bg-muted px-1 py-0.5 text-foreground">/api/metrics</code> are
          already modeled in this repo (same spine as <strong className="text-foreground">Marts &amp; modeling</strong> and{" "}
          <strong className="text-foreground">Metric truth</strong>). {focus}
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
          >
            <BarChart3 className="h-3.5 w-3.5 shrink-0" aria-hidden />
            BI surface (charts prove the contract)
          </Link>
          <span className="text-muted-foreground/80">·</span>
          <Link href="/source-of-truth?section=visualization" className="font-medium text-primary underline-offset-4 hover:underline">
            Visualization and value (Metric truth)
          </Link>
        </p>
      </div>
    </aside>
  );
}
