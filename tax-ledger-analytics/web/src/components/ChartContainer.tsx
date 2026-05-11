"use client";

import { cn } from "@/lib/utils";

type ChartContainerProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** Override inner chart viewport height (default fits most Recharts panels). */
  chartClassName?: string;
};

export function ChartContainer({ title, description, children, className, chartClassName }: ChartContainerProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur-sm transition-colors hover:border-[hsl(355,33%,82%)] md:p-6",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className={cn("h-[240px] w-full sm:h-[252px]", chartClassName)}>{children}</div>
    </div>
  );
}
