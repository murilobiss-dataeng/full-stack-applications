"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/config/siteNav";
import { HOME_SCENARIO_DISPLAY_NAME, SITE_NAV_DESCRIPTOR } from "@/config/branding";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 font-semibold tracking-tight transition-all duration-200 hover:opacity-90 active:scale-[0.99] sm:gap-3"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-white shadow-sm ring-1 ring-primary/10 sm:h-11 sm:w-11">
            <Image
              src="/sigma_logo.png"
              alt={`${HOME_SCENARIO_DISPLAY_NAME} logo`}
              width={44}
              height={44}
              className="object-contain p-1.5"
              priority
            />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[15px] text-foreground sm:text-base">{HOME_SCENARIO_DISPLAY_NAME}</span>
            <span className="truncate text-[11px] font-normal text-muted-foreground sm:text-xs">{SITE_NAV_DESCRIPTOR}</span>
          </span>
        </Link>
        <nav className="hidden shrink-0 items-center gap-1 md:flex" aria-label="Primary">
          {primaryNav.map(({ href, label, spotlight }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground",
                pathname === href && "bg-muted text-foreground",
                spotlight && "ring-1 ring-primary/35 bg-primary/5 text-primary hover:text-primary",
              )}
            >
              {spotlight ? <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden /> : null}
              {label}
            </Link>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open ? (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {primaryNav.map(({ href, label, spotlight }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground",
                  pathname === href && "bg-muted text-foreground",
                  spotlight && "ring-1 ring-primary/35 bg-primary/5 text-primary",
                )}
              >
                {spotlight ? <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden /> : null}
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
