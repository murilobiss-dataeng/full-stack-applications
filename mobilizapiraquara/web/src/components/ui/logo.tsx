import Image from "next/image";
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
  /** Fundo sempre escuro (ex.: /publique) — usa o PNG original */
  onDarkBackground?: boolean;
};

const imageSizes = {
  sm: { w: 120, h: 40, cls: "max-h-9 w-auto sm:max-h-10" },
  md: { w: 160, h: 52, cls: "max-h-11 w-auto sm:max-h-12" },
  lg: { w: 220, h: 72, cls: "max-h-14 w-auto sm:max-h-16" },
};

const svgSizes = {
  sm: "w-[130px] sm:w-[150px]",
  md: "w-[155px] sm:w-[195px]",
  lg: "w-[195px] sm:w-[250px]",
};

export function Logo({
  size = "md",
  showTagline = false,
  className,
  linked = true,
  href = "/#inicio",
  onDarkBackground = false,
}: LogoProps) {
  const img = imageSizes[size];
  const svgW = svgSizes[size];

  const mark = onDarkBackground ? (
    <Image
      src="/mobiliza_logo.png"
      alt={SITE.name}
      width={img.w}
      height={img.h}
      className={cn("h-auto object-contain", img.cls)}
      priority
    />
  ) : (
    <>
      {/* Tema claro: SVG com texto escuro */}
      <MobilizaLogoMark variant="light" className={cn("shrink-0 dark:hidden", svgW)} />
      {/* Tema escuro: PNG original (texto branco) */}
      <Image
        src="/mobiliza_logo.png"
        alt={SITE.name}
        width={img.w}
        height={img.h}
        className={cn("hidden h-auto object-contain dark:block", img.cls)}
        priority
      />
    </>
  );

  const content = (
    <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4", className)}>
      {mark}
      {showTagline && (
        <p
          className={cn(
            "max-w-xs text-sm font-medium leading-snug sm:text-base",
            onDarkBackground ? "text-zinc-300" : "text-zinc-700 dark:text-zinc-300"
          )}
        >
          {SITE.tagline}
        </p>
      )}
    </div>
  );

  if (!linked) return content;

  return (
    <Link href={href} className="group inline-block transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}
