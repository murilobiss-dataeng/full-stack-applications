import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description: string;
  kicker?: string;
};

export function PageHeader({ title, description, kicker }: PageHeaderProps) {
  return (
    <header className="mb-8 md:mb-9">
      <Link
        href="/"
        className="group mb-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        Home
      </Link>
      {kicker ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{kicker}</p>
      ) : null}
      <h1 className="mt-1.5 text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-[2rem]">{title}</h1>
      <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">{description}</p>
    </header>
  );
}
