import { cn } from "@/lib/utils";

type MobilizaLogoMarkProps = {
  className?: string;
  variant?: "auto" | "light" | "dark";
};

export function MobilizaLogoMark({ className, variant = "auto" }: MobilizaLogoMarkProps) {
  const textClass =
    variant === "light"
      ? "text-zinc-900"
      : variant === "dark"
        ? "text-white"
        : "text-zinc-900 dark:text-white";

  return (
    <svg
      viewBox="0 0 280 76"
      role="img"
      aria-label="Mobiliza Piraquara"
      className={cn("font-serif", textClass, className)}
      fill="currentColor"
    >
      <text
        x="140"
        y="26"
        textAnchor="middle"
        style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}
      >
        Mobiliza
      </text>

      <g transform="translate(140, 38)">
        <path
          d="M-18 0 C-22 -12 -8 -18 0 -10 C8 -18 22 -12 18 0 C12 8 0 12 -12 8 C-16 4 -18 0 -18 0 Z"
          fill="#71717a"
          stroke="#52525b"
          strokeWidth="1"
        />
        <path d="M-4 -8 Q0 2 4 -8" fill="none" stroke="#3f3f46" strokeWidth="1.2" />
        <path d="M0 -10 Q-2 0 0 10" fill="none" stroke="#3f3f46" strokeWidth="1" />
        <path d="M4 -8 Q0 2 -4 -8" fill="none" stroke="#3f3f46" strokeWidth="1.2" />
      </g>

      <text
        x="140"
        y="68"
        textAnchor="middle"
        style={{ fontSize: 19, fontWeight: 700, letterSpacing: "0.14em" }}
      >
        PIRAQUARA
      </text>
    </svg>
  );
}
