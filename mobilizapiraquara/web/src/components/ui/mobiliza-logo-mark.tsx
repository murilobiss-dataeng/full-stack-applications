import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** light = texto escuro (fundo claro); dark = texto branco (fundo escuro) */
  variant?: "light" | "dark";
};

/** Logo Mobiliza Piraquara — SVG vetorial (sem PNG). */
export function MobilizaLogoMark({ className, variant = "light" }: Props) {
  const primary = variant === "dark" ? "#ffffff" : "#18181b";
  const secondary = variant === "dark" ? "#e4e4e7" : "#52525b";
  const accent = variant === "dark" ? "#a1a1aa" : "#71717a";

  return (
    <svg
      viewBox="0 0 240 56"
      role="img"
      aria-label="Mobiliza Piraquara"
      className={cn("block h-auto w-[168px] sm:w-[200px]", className)}
    >
      <text
        x="0"
        y="22"
        fill={primary}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em" }}
      >
        MOBILIZA
      </text>

      <g transform="translate(118, 6)">
        <circle cx="12" cy="12" r="11" fill={accent} fillOpacity={variant === "dark" ? 0.35 : 0.2} />
        <path
          d="M12 4 C8 4 5 8 5 12 C5 17 8 20 12 20 C16 20 19 17 19 12 C19 8 16 4 12 4 Z M12 8 L12 16 M8 12 L16 12"
          stroke={primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M12 8 C14 10 14 14 12 16 C10 14 10 10 12 8 Z" fill={secondary} />
      </g>

      <text
        x="0"
        y="48"
        fill={secondary}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.28em" }}
      >
        PIRAQUARA
      </text>
    </svg>
  );
}
