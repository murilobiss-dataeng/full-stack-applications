const POOLER_ENV_KEYS = ["DATABASE_POOLER_URL", "SUPABASE_POOLER_URL"] as const;

const FALLBACK_ENV_KEYS = ["POSTGRES_PRISMA_URL", "POSTGRES_URL"] as const;

/** Ex.: aws-1 (painel Supabase) → host aws-1-us-east-1.pooler.supabase.com */
const DEFAULT_POOLER_PREFIX = "aws-1";

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

function appendQueryParam(url: string, key: string, value: string): string {
  if (new RegExp(`[?&]${key}=`, "i").test(url)) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${key}=${value}`;
}

/** Parâmetros para URL de runtime (transaction pooler, porta 6543). */
function withTransactionPoolerParams(url: string): string {
  if (!/supabase\.co/i.test(url)) return url;
  let result = appendQueryParam(url, "sslmode", "require");
  if (/:6543(\/|$|\?)/.test(result)) {
    result = appendQueryParam(result, "pgbouncer", "true");
    result = appendQueryParam(result, "connection_limit", "1");
  }
  return result;
}

/** Session / direct URL (porta 5432) — sem pgbouncer. */
function withSessionPoolerParams(url: string): string {
  if (!/supabase\.co/i.test(url)) return url;
  return appendQueryParam(url, "sslmode", "require");
}

type ParsedSupabase = {
  password: string;
  projectRef: string;
  database: string;
  port: string;
  hostname: string;
  username: string;
};

function parsePostgresUrl(url: string): ParsedSupabase | null {
  try {
    const u = new URL(url);
    const dbMatch = u.hostname.match(/^db\.([a-z0-9]+)\.supabase\.co$/i);
    const userMatch = u.username.match(/^postgres(?:\.([a-z0-9]+))?$/i);
    const projectRef = dbMatch?.[1] ?? userMatch?.[1] ?? null;

    if (!projectRef) return null;
    if (!u.hostname.includes("supabase.co")) return null;

    return {
      password: decodeURIComponent(u.password),
      projectRef,
      database: u.pathname.replace(/^\//, "") || "postgres",
      port: u.port || "5432",
      hostname: u.hostname,
      username: u.username,
    };
  } catch {
    return null;
  }
}

function isDirectDbHost5432(url: string): boolean {
  const parsed = parsePostgresUrl(url);
  if (!parsed) return false;
  return parsed.hostname === `db.${parsed.projectRef}.supabase.co` && parsed.port === "5432";
}

function isTransactionPoolerUrl(url: string): boolean {
  return /pooler\.supabase\.com/i.test(url) && /:6543(\/|$|\?)/.test(url);
}

/** Host do pooler: SUPABASE_POOLER_HOST ou aws-1-us-east-1.pooler.supabase.com */
function getPoolerHostname(): string | null {
  const explicit = process.env.SUPABASE_POOLER_HOST?.trim();
  if (explicit) return explicit;

  const region = process.env.SUPABASE_REGION?.trim();
  if (!region) return null;

  const prefix = process.env.SUPABASE_POOLER_PREFIX?.trim() || DEFAULT_POOLER_PREFIX;
  return `${prefix}-${region}.pooler.supabase.com`;
}

function buildPoolerUrls(parsed: ParsedSupabase): { transaction: string; session: string } | null {
  const host = getPoolerHostname();
  if (!host) return null;

  const user = `postgres.${parsed.projectRef}`;
  const encodedPassword = encodeURIComponent(parsed.password);

  const transaction = withTransactionPoolerParams(
    `postgresql://${user}:${encodedPassword}@${host}:6543/${parsed.database}`
  );
  const session = withSessionPoolerParams(
    `postgresql://${user}:${encodedPassword}@${host}:5432/${parsed.database}`
  );

  return { transaction, session };
}

/** Converte db.xxx:5432 → pooler oficial (aws-1-REGIAO ou SUPABASE_POOLER_HOST). */
function upgradeDirectToPooler(directUrl: string): { transaction: string; session?: string } | null {
  if (isTransactionPoolerUrl(directUrl)) {
    return { transaction: withTransactionPoolerParams(directUrl) };
  }

  const parsed = parsePostgresUrl(directUrl);
  if (!parsed) return null;

  if (isDirectDbHost5432(directUrl)) {
    const built = buildPoolerUrls(parsed);
    if (built) return built;

    const user = `postgres.${parsed.projectRef}`;
    const encodedPassword = encodeURIComponent(parsed.password);
    const projectHost = `db.${parsed.projectRef}.supabase.co`;
    return {
      transaction: withTransactionPoolerParams(
        `postgresql://${user}:${encodedPassword}@${projectHost}:6543/${parsed.database}`
      ),
    };
  }

  return null;
}

export function normalizeDatabaseUrl(raw?: string): string | undefined {
  if (!raw?.trim()) return undefined;

  const url = stripQuotes(raw);

  if (/^postgres(ql)?:\/\//i.test(url)) {
    if (isTransactionPoolerUrl(url) || /:6543(\/|$|\?)/.test(url)) {
      return withTransactionPoolerParams(url);
    }
    if (/pooler\.supabase\.com/i.test(url) && /:5432(\/|$|\?)/.test(url)) {
      return withSessionPoolerParams(url);
    }
    return withTransactionPoolerParams(url);
  }

  if (/^postgres:/i.test(url) && url.includes("@")) {
    const rest = url.replace(/^postgres:/i, "");
    const path = rest.startsWith("//") ? rest.slice(2) : rest;
    return withTransactionPoolerParams(`postgresql://postgres:${path}`);
  }

  if (url.includes("@") && !url.includes("://")) {
    return withTransactionPoolerParams(`postgresql://postgres:${url}`);
  }

  return url;
}

function pickPoolerFromEnv(): string | undefined {
  for (const key of POOLER_ENV_KEYS) {
    const raw = process.env[key];
    if (raw?.trim()) {
      const normalized = normalizeDatabaseUrl(raw);
      if (normalized) return normalized;
    }
  }
  return undefined;
}

function resolveRuntimeDatabaseUrl(normalizedInput: string): string {
  const fromEnv = pickPoolerFromEnv();
  if (fromEnv) return fromEnv;

  if (isTransactionPoolerUrl(normalizedInput)) {
    return withTransactionPoolerParams(normalizedInput);
  }

  if (isDirectDbHost5432(normalizedInput)) {
    const upgraded = upgradeDirectToPooler(normalizedInput);
    if (upgraded?.transaction) {
      const host = upgraded.transaction.match(/@([^/?:]+)/)?.[1] ?? "pooler";
      console.info(`[db] Supabase → transaction pooler (${host}:6543)`);
      return upgraded.transaction;
    }
  }

  return normalizedInput;
}

export function applyDatabaseEnv(): void {
  if (!process.env.DATABASE_URL?.trim()) {
    for (const key of [...POOLER_ENV_KEYS, ...FALLBACK_ENV_KEYS]) {
      const value = process.env[key];
      if (value?.trim()) {
        process.env.DATABASE_URL = stripQuotes(value);
        break;
      }
    }
  }

  const rawDb = process.env.DATABASE_URL?.trim();
  if (!rawDb) return;

  const normalizedDb = normalizeDatabaseUrl(stripQuotes(rawDb));
  if (!normalizedDb) return;

  process.env.DATABASE_URL = resolveRuntimeDatabaseUrl(normalizedDb);

  const rawDirect = process.env.DIRECT_URL?.trim();
  if (rawDirect) {
    const normalizedDirect = normalizeDatabaseUrl(stripQuotes(rawDirect));
    if (normalizedDirect) {
      process.env.DIRECT_URL = /:5432(\/|$|\?)/.test(normalizedDirect)
        ? withSessionPoolerParams(normalizedDirect)
        : normalizedDirect;
    }
    return;
  }

  if (isDirectDbHost5432(normalizedDb)) {
    const upgraded = upgradeDirectToPooler(normalizedDb);
    if (upgraded?.session) {
      process.env.DIRECT_URL = upgraded.session;
    }
  }
}

export function getDatabaseUrl(): string | undefined {
  applyDatabaseEnv();
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return undefined;

  const normalized = normalizeDatabaseUrl(url) ?? url;
  if (isDirectDbHost5432(normalized)) {
    return resolveRuntimeDatabaseUrl(normalized);
  }
  return normalized;
}

export function getDirectDatabaseUrl(): string | undefined {
  applyDatabaseEnv();
  const url = process.env.DIRECT_URL?.trim();
  return url ? normalizeDatabaseUrl(url) ?? url : undefined;
}

export function isDatabaseConfigured(): boolean {
  const url = getDatabaseUrl();
  return Boolean(url && /^postgres(ql)?:\/\//i.test(url));
}

export function logDatabaseTarget(): void {
  const url = getDatabaseUrl();
  if (!url) return;
  console.info("[db] Prisma →", url.replace(/:([^:@/]+)@/, ":***@"));
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
