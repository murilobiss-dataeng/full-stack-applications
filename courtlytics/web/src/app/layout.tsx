import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    default: "Courtlytics — Legal Entity Resolution & Analytics",
    template: "%s | Courtlytics",
  },
  description:
    "Courtlytics is a portfolio LegalTech data platform demonstrating lawyer identity resolution, PostgreSQL modeling, S3-style lake zones, dbt transformations, and production-minded Python pipelines.",
  keywords: [
    "Courtlytics",
    "LegalTech",
    "entity resolution",
    "PostgreSQL",
    "data engineering",
    "dbt",
    "AWS S3",
    "Python ETL",
  ],
  openGraph: {
    title: "Courtlytics — Legal Entity Resolution & Analytics",
    description: "Legal entity resolution and analytics platform — senior data engineering portfolio.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} min-h-screen font-sans`}>
        <Suspense fallback={<div className="h-16 border-b border-border" aria-hidden />}>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
