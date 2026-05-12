/**
 * Grava uma cópia local do CV em public/cv-murilo-biss.pdf (mesmo fluxo visual que /cv na API).
 *
 * Uso:
 *   1) num terminal: npm run dev   (ou npm run start após build)
 *   2) neste diretório web/: npm run save:cv-pdf
 *
 * Variáveis opcionais:
 *   CV_SAVE_URL=http://127.0.0.1:3000   — base onde /cv responde
 *   PUPPETEER_EXECUTABLE_PATH=...       — Chrome/Chromium se não for detectado
 *   CV_PDF_USE_SPARTICUZ=1              — forçar binário @sparticuz (pode falhar em desktop sem libs Lambda)
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const outPath = path.join(webRoot, "public", "cv-murilo-biss.pdf");

const VIEWPORT = { width: 1280, height: 1800, deviceScaleFactor: 2 };
const BASE_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--font-render-hinting=none",
];

function systemChromeCandidates() {
  const fromEnv = [
    process.env.PUPPETEER_EXECUTABLE_PATH?.trim(),
    process.env.CHROME_PATH?.trim(),
    process.env.CHROMIUM_PATH?.trim(),
  ].filter(Boolean);
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
  return [...new Set([...fromEnv, ...defaults])];
}

async function launchBrowser() {
  const onVercel = !!process.env.VERCEL;
  const forceSparticuz = process.env.CV_PDF_USE_SPARTICUZ === "1";

  if (onVercel || forceSparticuz) {
    chromium.setGraphicsMode = false;
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: VIEWPORT,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const envPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  const failures = [];
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
      failures.push(String(e?.message || e));
    }
  }

  throw new Error(
    `Sem Chrome no sistema. Define PUPPETEER_EXECUTABLE_PATH ou CHROME_PATH, ou instala google-chrome-stable.\n${failures.join("\n")}`,
  );
}

async function main() {
  const base = (process.env.CV_SAVE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
  const cvUrl = `${base}/cv`;

  console.log(`→ Abrindo ${cvUrl} … (deixe o Next a correr neste URL)`);

  const browser = await launchBrowser();
  try {
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

    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, Buffer.from(pdf));
    console.log(`✓ PDF gravado em: ${outPath}`);
  } finally {
    await browser.close().catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  console.error(
    "\nDica: instala Google Chrome ou Chromium, ou define PUPPETEER_EXECUTABLE_PATH. Garante que `npm run dev` está a correr em",
    process.env.CV_SAVE_URL || "http://127.0.0.1:3000",
  );
  process.exit(1);
});
