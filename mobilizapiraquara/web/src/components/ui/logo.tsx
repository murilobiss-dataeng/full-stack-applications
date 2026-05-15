import Link from "next/link";
import { SITE } from "@/lib/constants";
import { MobilizaLogoMark } from "@/components/ui/mobiliza-logo-mark";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  linked?: boolean;
  href?: string;
  onDarkBackground?: boolean;
};

const widths = {
  sm: "w-[140px] sm:w-[160px]",
  md: "w-[168px] sm:w-[200px]",
  lg: "w-[200px] sm:w-[240px]",
};

export function Logo({
  size = "md",
  showTagline = false,
  className,
  linked = true,
  href = "/#inicio",
  onDarkBackground = false,
}: LogoProps) {
  const variant = onDarkBackground ? "dark" : "light";

  const mark = <MobilizaLogoMark variant={variant} className={widths[size]} />;

  const content = (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      {mark}
      {showTagline && (
        <p
          className={cn(
            "max-w-[200px] text-xs leading-snug",
            onDarkBackground ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-400"
          )}
        >
          {SITE.tagline}
        </p>
      )}
    </div>
  );

  if (!linked) return content;

  return (
    <Link href={href} className="inline-block transition-opacity hover:opacity-85">
      {content}
    </Link>
  );
}
