import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  linked?: boolean;
  href?: string;
};

const sizes = {
  sm: { w: 140, h: 46, className: "h-9 w-auto sm:h-10" },
  md: { w: 180, h: 58, className: "h-11 w-auto sm:h-12" },
  lg: { w: 240, h: 78, className: "h-14 w-auto sm:h-16" },
};

export function Logo({
  size = "md",
  showTagline = false,
  className,
  linked = true,
  href = "/#inicio",
}: LogoProps) {
  const dim = sizes[size];

  const content = (
    <div className={cn("inline-flex flex-col items-start gap-2", className)}>
      <Image
        src="/mobiliza_logo.png"
        alt={SITE.name}
        width={dim.w}
        height={dim.h}
        className={cn("h-auto object-contain", dim.className)}
        priority
      />
      {showTagline && (
        <p className="max-w-xs text-sm leading-snug text-zinc-400">{SITE.tagline}</p>
      )}
    </div>
  );

  if (!linked) return content;

  return (
    <Link href={href} className="inline-block transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}
