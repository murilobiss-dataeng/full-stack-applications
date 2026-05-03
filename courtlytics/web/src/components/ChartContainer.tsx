"use client";

import { cn } from "@/lib/utils";

type ChartContainerProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function ChartContainer({ title, description, children, className }: ChartContainerProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur-sm transition-colors hover:border-[hsl(217,33%,22%)] md:p-6",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className="h-[280px] w-full">{children}</div>
    </div>
  );
}
