"use client";

import { Printer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CvPrintButtonProps = {
  className?: string;
  variant?: "default" | "outline" | "ghost";
};

/** Opens the browser print dialog — Save as PDF yields output aligned with the on-page CV (see globals.css @media print). */
export function CvPrintButton({ className, variant = "default" }: CvPrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(buttonVariants({ variant }), "gap-2", className)}
    >
      <Printer className="h-4 w-4" aria-hidden />
      Save as PDF (print)
    </button>
  );
}
