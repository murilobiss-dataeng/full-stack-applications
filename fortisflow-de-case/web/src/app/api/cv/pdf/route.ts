import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const maxDuration = 60;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Renders /cv in headless Chromium and returns a PDF that matches the on-screen layout
 * (same HTML/CSS as the live page; chrome and demo chrome are stripped via injected CSS).
 */
export async function GET(request: Request) {
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;
  try {
    const requestUrl = new URL(request.url);
    const origin =
      requestUrl.origin && requestUrl.origin !== "null"
        ? requestUrl.origin
        : process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://127.0.0.1:3000";
    const cvUrl = `${origin.replace(/\/$/, "")}/cv`;

    chromium.setGraphicsMode = false;

    const customChrome = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
    const executablePath = customChrome?.length ? customChrome : await chromium.executablePath();
    const args = customChrome?.length
      ? ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--font-render-hinting=none"]
      : chromium.args;

    browser = await puppeteer.launch({
      args,
      defaultViewport: { width: 1280, height: 1800, deviceScaleFactor: 2 },
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(cvUrl, { waitUntil: "networkidle0", timeout: 120_000 });

    await page.addStyleTag({
      content: `
        header, body > footer, body > a[href="#main-content"] { display: none !important; }
        [data-pdf-hide="true"] { display: none !important; }
      `,
    });
    await page.emulateMediaType("screen");

    await page.waitForSelector("#cv-document", { timeout: 45_000 });
    await new Promise((r) => setTimeout(r, 400));

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
    });

    await browser.close();
    browser = undefined;

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="murilo-biss-cv.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    if (browser) {
      await browser.close().catch(() => {});
    }
    console.error("[cv/pdf]", err);
    return NextResponse.json(
      {
        error: "PDF generation failed",
        hint:
          "On local machines, install Chromium/Chrome and set PUPPETEER_EXECUTABLE_PATH (e.g. /usr/bin/chromium-browser). On Vercel, deploy with Node 18+; the bundled @sparticuz/chromium binary is used automatically.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
