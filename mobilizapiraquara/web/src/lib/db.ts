function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

type Parsed = {
  username: string;
  password: string;
  hostname: string;
  port: string;
  database: string;
  projectRef: string | null;
};

function parseUrl(url: string): Parsed | null {
  try {
    const u = new URL(url);
    const dbRef = u.hostname.match(/^db\.([a-z0-9]+)\.supabase\.co$/i)?.[1] ?? null;
    const userRef = u.username.match(/^postgres\.([a-z0-9]+)$/i)?.[1] ?? null;

    return {
      username: u.username,
      password: u.password,
      hostname: u.hostname,
      port: u.port || "5432",
      database: u.pathname.replace(/^\//, "") || "postgres",
      projectRef: dbRef ?? userRef,
    };
  } catch {
    return null;
  }
}

function isDbHostDirect(url: string): boolean {
  const p = parseUrl(url);
  return Boolean(p?.hostname.match(/^db\.[a-z0-9]+\.supabase\.co$/i));
}

function isPoolerHost(url: string): boolean {
  return /pooler\.supabase\.com/i.test(url);
}

function poolerHostFromEnv(): string | null {
  for (const key of ["DATABASE_URL", "DIRECT_URL"] as const) {
    const raw = process.env[key];
    if (!raw?.includes("pooler.supabase.com")) continue;
    const host = raw.match(/@([^/:?]+)/)?.[1];
    if (host) return host;
  }
  return null;
}

function encodePassword(password: string): string {
  try {
    return encodeURIComponent(decodeURIComponent(password));
  } catch {
    return encodeURIComponent(password);
  }
}

/**
 * Monta URL de session pooler (:5432) a partir do project ref + senha.
 * Host vem do DATABASE_URL (aws-1-us-east-1...) ou fallback us-east-1.
 */
function buildSessionPoolerUrl(projectRef: string, password: string): string {
  const host = poolerHostFromEnv() ?? "aws-1-us-east-1.pooler.supabase.com";
  const user = `postgres.${projectRef}`;
  return `postgresql://${user}:${encodePassword(password)}@${host}:5432/postgres?sslmode=require`;
}

/** Normaliza postgres:senha@host → postgresql://... */
export function normalizeDatabaseUrl(raw?: string): string | undefined {
  if (!raw?.trim()) return undefined;
  const url = stripQuotes(raw);

  if (/^postgres(ql)?:\/\//i.test(url)) return url;

  if (/^postgres:/i.test(url) && url.includes("@")) {
    const rest = url.replace(/^postgres:/i, "");
    const path = rest.startsWith("//") ? rest.slice(2) : rest;
    return `postgresql://postgres:${path}`;
  }

  return url;
}

/**
 * URL final para o Prisma na Vercel.
 * Nunca usa db.xxx.supabase.co:5432 (IPv6 / bloqueado na Vercel).
 */
export function resolvePrismaDatabaseUrl(): string | undefined {
  const database = process.env.DATABASE_URL?.trim()
    ? normalizeDatabaseUrl(process.env.DATABASE_URL)
    : undefined;
  const direct = process.env.DIRECT_URL?.trim()
    ? normalizeDatabaseUrl(process.env.DIRECT_URL)
    : undefined;

  if (direct && isPoolerHost(direct) && direct.includes(":5432")) {
    return direct;
  }

  if (database && isPoolerHost(database)) {
    const p = parseUrl(database);
    if (p?.projectRef && database.includes(":6543")) {
      return buildSessionPoolerUrl(p.projectRef, p.password);
    }
    if (database.includes(":5432")) {
      return database.includes("sslmode") ? database : `${database}${database.includes("?") ? "&" : "?"}sslmode=require`;
    }
  }

  for (const candidate of [direct, database]) {
    if (!candidate || !isDbHostDirect(candidate)) continue;
    const p = parseUrl(candidate);
    if (p?.projectRef) {
      console.info(
        `[db] ${candidate.includes("db.") ? "DIRECT_URL" : "URL"} aponta para db.*:5432 (não funciona na Vercel). ` +
          `Usando session pooler em ${poolerHostFromEnv() ?? "aws-1-us-east-1.pooler.supabase.com"}:5432`
      );
      return buildSessionPoolerUrl(p.projectRef, p.password);
    }
  }

  return database ?? direct;
}

export function applyDatabaseEnv(): void {
  const prismaUrl = resolvePrismaDatabaseUrl();
  if (prismaUrl) {
    process.env.DATABASE_URL = prismaUrl;
  }
}

export function getPrismaDatabaseUrl(): string | undefined {
  applyDatabaseEnv();
  return process.env.DATABASE_URL?.trim() || undefined;
}

export function getDatabaseUrl(): string | undefined {
  return getPrismaDatabaseUrl();
}

export function getDirectDatabaseUrl(): string | undefined {
  return getPrismaDatabaseUrl();
}

export function isDatabaseConfigured(): boolean {
  const url = getPrismaDatabaseUrl();
  return Boolean(url && /^postgres(ql)?:\/\//i.test(url));
}

export function logDatabaseTarget(): void {
  const url = getPrismaDatabaseUrl();
  if (!url) return;
  const host = url.match(/@([^/]+)/)?.[1] ?? "?";
  console.info("[db] Prisma →", url.replace(/:([^:@/]+)@/, ":***@"), `| host ${host}`);
}

export async function dbQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDatabaseConfigured()) return fallback;
  try {
    return await fn();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[db] consulta falhou, usando fallback:", error);
    }
    return fallback;
  }
}
