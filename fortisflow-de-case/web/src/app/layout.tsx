import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_PRODUCT_NAME } from "@/config/branding";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

/** Prefer real deployment URL on Vercel; tolerate missing `https://` in env. */
function resolveMetadataBase(): URL {
  const withScheme = (value: string): string => {
    const v = value.trim();
    if (/^https?:\/\//i.test(v)) return v;
    return `https://${v}`;
  };
  try {
    const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (site) return new URL(withScheme(site));
    if (process.env.VERCEL_URL) return new URL(`https://${process.env.VERCEL_URL}`);
  } catch {
    /* fall through */
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: `Murilo Biss · ${SITE_PRODUCT_NAME} · Snowflake Senior Data Engineer case`,
    template: `%s | ${SITE_PRODUCT_NAME}`,
  },
  description:
    `Murilo Biss: Snowflake-centric Data Engineering portfolio case (${SITE_PRODUCT_NAME}). ELT, warehouse layers, cost and performance discipline, data quality, and governance framing for enterprise / regulated contexts. ${SITE_PRODUCT_NAME} is a fictional program used only in this demo.`,
  keywords: [
    SITE_PRODUCT_NAME,
    "Murilo Biss",
    "Senior Data Engineer",
    "Snowflake",
    "data warehousing",
    "ELT",
    "dbt",
    "SQL",
    "data quality",
    "data governance",
    "cost optimization",
    "pipeline optimization",
    "Python",
  ],
  openGraph: {
    title: `Murilo Biss · ${SITE_PRODUCT_NAME}`,
    description: `Snowflake, DW design, and data quality: ${SITE_PRODUCT_NAME} Data Engineering portfolio (Murilo Biss).`,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} min-h-screen font-sans`}>
        <a
          href="#main-content"
          className="fixed -top-16 left-4 z-[100] rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-md transition-[top] duration-150 focus:top-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to content
        </a>
        <Suspense fallback={<div className="h-16 border-b border-border" aria-hidden />}>
          <Navbar />
        </Suspense>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
