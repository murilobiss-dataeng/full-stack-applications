import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  linked?: boolean;
};

const sizes = {
  sm: { w: 36, h: 36, text: "text-sm" },
  md: { w: 52, h: 52, text: "text-base" },
  lg: { w: 72, h: 72, text: "text-lg" },
};

export function Logo({ size = "md", showTagline = false, className, linked = true }: LogoProps) {
  const { w, h, text } = sizes[size];

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/mobiliza_logo.png"
        alt={SITE.name}
        width={w}
        height={h}
        className="h-auto w-auto max-h-[72px] object-contain"
        priority
      />
      {showTagline && (
        <p className={cn("max-w-xs font-medium leading-snug text-brand-700 dark:text-brand-300", text)}>
          {SITE.tagline}
        </p>
      )}
    </div>
  );

  if (!linked) return content;

  return (
    <Link href="/" className="group transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}
