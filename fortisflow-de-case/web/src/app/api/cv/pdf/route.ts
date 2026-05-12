import { existsSync } from "node:fs";
import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const maxDuration = 60;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const VIEWPORT = { width: 1280, height: 1800, deviceScaleFactor: 2 } as const;

const BASE_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--font-render-hinting=none",
] as const;

/** Chrome/Chromium installed on the host (not the Lambda bundle — avoids libnss3 / glibc mismatches outside Vercel). */
function systemChromeCandidates(): string[] {
  const fromEnv = [
    process.env.PUPPETEER_EXECUTABLE_PATH?.trim(),
    process.env.CHROME_PATH?.trim(),
    process.env.CHROMIUM_PATH?.trim(),
  ].filter((p): p is string => Boolean(p?.length));
  const defaults = [
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/opt/google/chrome/chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
    "/usr/bin/brave-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  const merged = [...fromEnv, ...defaults];
  return merged.filter((p, i) => merged.indexOf(p) === i);
}

/**
 * @sparticuz/chromium targets AWS Lambda (Vercel Functions). It must NOT run when `VERCEL=1` / `VERCEL_ENV`
 * are copied into `.env.local` (e.g. `vercel env pull`) — those lack Lambda libs and produce libnss3 errors.
 * Real deployments set runtime-only system vars such as `VERCEL_REGION` (see Vercel system env docs).
 */
function bundledLambdaChromiumEnabled(): boolean {
  if (process.env.CV_PDF_USE_SPARTICUZ === "1") return true;
  if (process.env.VERCEL !== "1") return false;
  const vercelEnv = process.env.VERCEL_ENV;
  if (!(vercelEnv === "production" || vercelEnv === "preview")) return false;
  const onVercelFunctionRuntime = Boolean(process.env.VERCEL_REGION || process.env.VERCEL_DEPLOYMENT_ID);
  return onVercelFunctionRuntime;
}

async function launchBrowser() {
  if (bundledLambdaChromiumEnabled()) {
    chromium.setGraphicsMode = false;
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: VIEWPORT,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const envPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  const failures: string[] = [];
  for (const executablePath of systemChromeCandidates()) {
    const isEnv = envPath && executablePath === envPath;
    if (!isEnv && !existsSync(executablePath)) continue;
    try {
      return await puppeteer.launch({
        executablePath,
        headless: true,
        args: [...BASE_ARGS],
        defaultViewport: VIEWPORT,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      failures.push(`${executablePath}: ${msg.slice(0, 120)}`);
    }
  }

  throw new Error(
    [
      "No system Chrome/Chromium could be started on this host (the Lambda @sparticuz binary is not used outside Vercel).",
      failures.length ? `Attempts:\n${failures.join("\n")}` : "No candidate binary paths exist.",
      "Fix: install Google Chrome (e.g. google-chrome-stable) or set PUPPETEER_EXECUTABLE_PATH / CHROME_PATH to the binary.",
      "Docker: either install Chrome in the image or generate PDF locally with `npm run save:cv-pdf`.",
    ].join("\n"),
  );
}

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

    browser = await launchBrowser();

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
          "Use system Chrome (PUPPETEER_EXECUTABLE_PATH / CHROME_PATH). The Lambda Chromium bundle runs only on real Vercel Functions (VERCEL_REGION or VERCEL_DEPLOYMENT_ID set). Remove VERCEL/VERCEL_ENV from .env.local if copied from the dashboard; enable System Environment Variables in Vercel project settings. Locally: npm run save:cv-pdf",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
