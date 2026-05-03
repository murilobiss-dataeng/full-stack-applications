import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  /** Tighter vertical rhythm when nested inside PageShell */
  dense?: boolean;
  /** Omit inner max-width container (use with PageShell) */
  flush?: boolean;
};

export function Section({ id, title, subtitle, children, className, dense, flush }: SectionProps) {
  return (
    <section id={id} className={cn(dense ? "py-6 md:py-8" : "py-16 md:py-24", className)}>
      <div className={cn(!flush && "mx-auto max-w-5xl px-4 sm:px-6")}>
        <h2
          className={cn(
            "text-balance font-semibold tracking-tight",
            dense ? "text-lg md:text-xl" : "text-2xl md:text-3xl",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={cn("mt-2 max-w-3xl text-muted-foreground", dense ? "text-sm" : "mt-3 md:text-lg")}>{subtitle}</p>
        ) : null}
        <div className={dense ? "mt-4" : "mt-10"}>{children}</div>
      </div>
    </section>
  );
}
