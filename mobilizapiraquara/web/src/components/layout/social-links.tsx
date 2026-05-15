import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const items = [
  {
    href: SOCIAL_LINKS.instagram,
    label: "Instagram",
    icon: InstagramIcon,
    className: "hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-950 dark:hover:text-pink-400",
  },
  {
    href: SOCIAL_LINKS.facebook,
    label: "Facebook",
    icon: FacebookIcon,
    className: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400",
  },
  {
    href: SOCIAL_LINKS.whatsapp,
    label: "WhatsApp",
    icon: MessageCircle,
    className: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
  },
] as const;

type SocialLinksProps = {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
  variant?: "light" | "dark";
};

export function SocialLinks({
  className,
  iconSize = 20,
  showLabels = false,
  variant = "light",
}: SocialLinksProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map(({ href, label, icon: Icon, className: itemClass }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 transition-colors",
            isDark
              ? "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
              : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50",
            !isDark && itemClass
          )}
        >
          {Icon === MessageCircle ? (
            <MessageCircle size={iconSize} aria-hidden />
          ) : (
            <Icon size={iconSize} />
          )}
          {showLabels && <span className="text-sm font-medium">{label}</span>}
        </Link>
      ))}
    </div>
  );
}
