import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  /** Wider layout for dashboards */
  wide?: boolean;
  className?: string;
};

export function PageShell({ children, wide, className }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-11",
        wide ? "max-w-6xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
