"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Scale, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/config/siteNav";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors duration-200 hover:bg-primary/25">
            <Scale className="h-5 w-5" aria-hidden />
          </span>
          <span>Courtlytics</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
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
