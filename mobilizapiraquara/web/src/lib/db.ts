const ENV_DATABASE_KEYS = ["DATABASE_URL", "DIRECT_URL"] as const;

const POOLER_ENV_KEYS = ["DATABASE_POOLER_URL", "SUPABASE_POOLER_URL"] as const;

const FALLBACK_ENV_KEYS = [
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL",
] as const;

/** Remove aspas acidentais ao colar na Vercel. */
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

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.VERCEL_ENV);
}

/** SSL e pooler exigidos pelo Supabase em deploy serverless (Vercel). */
function withSupabaseDefaults(url: string): string {
  if (!/supabase\.co/i.test(url)) return url;

  let result = url;
  result = appendQueryParam(result, "sslmode", "require");

  if (/:6543\//.test(result) || /pooler\.supabase\.com/i.test(result)) {
    result = appendQueryParam(result, "pgbouncer", "true");
    result = appendQueryParam(result, "connection_limit", "1");
  }

  return result;
}

type ParsedSupabaseDirect = {
  password: string;
  projectRef: string;
  database: string;
};

/** postgresql://postgres:PASS@db.REF.supabase.co:5432/postgres */
function parseSupabaseDirectUrl(url: string): ParsedSupabaseDirect | null {
  const m = url.match(
    /^postgres(?:ql)?:\/\/postgres:([^@]+)@db\.([a-z0-9]+)\.supabase\.co:5432\/([^?]+)/i
  );
  if (!m) return null;
  return { password: m[1], projectRef: m[2], database: m[3] };
}

function isAlreadyPoolerUrl(url: string): boolean {
  return /pooler\.supabase\.com/i.test(url) || /:6543\//.test(url);
}

/**
 * Vercel não alcança bem db.xxx.supabase.co:5432 (conexão direta).
 * Usa transaction pooler (porta 6543), como no painel Supabase → Connect → ORMs → Prisma.
 */
function toSupabasePoolerUrl(directUrl: string): string | null {
  if (isAlreadyPoolerUrl(directUrl)) return withSupabaseDefaults(directUrl);

  const parsed = parseSupabaseDirectUrl(directUrl);
  if (!parsed) return null;

  const { password, projectRef, database } = parsed;
  const region = process.env.SUPABASE_REGION?.trim();

  if (region) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    return withSupabaseDefaults(
      `postgresql://postgres.${projectRef}:${password}@${host}:6543/${database}`
    );
  }

  // Supavisor no mesmo host (muitos projetos Supabase)
  return withSupabaseDefaults(
    `postgresql://postgres.${projectRef}:${password}@db.${projectRef}.supabase.co:6543/${database}`
  );
}

/**
 * Aceita o formato salvo na Vercel:
 *   postgres:SENHA@db.xxx.supabase.co:5432/postgres
 */
export function normalizeDatabaseUrl(raw?: string): string | undefined {
  if (!raw?.trim()) return undefined;

  const url = stripQuotes(raw);

  if (/^postgres(ql)?:\/\//i.test(url)) {
    return withSupabaseDefaults(url);
  }

  if (/^postgres:/i.test(url) && url.includes("@")) {
    const rest = url.replace(/^postgres:/i, "");
    const path = rest.startsWith("//") ? rest.slice(2) : rest;
    return withSupabaseDefaults(`postgresql://postgres:${path}`);
  }

  if (url.includes("@") && !url.includes("://")) {
    return withSupabaseDefaults(`postgresql://postgres:${url}`);
  }

  return url;
}

function pickRuntimeUrl(normalizedDirect?: string): string | undefined {
  for (const key of POOLER_ENV_KEYS) {
    const raw = process.env[key];
    if (raw?.trim()) {
      const pooler = normalizeDatabaseUrl(raw);
      if (pooler) return pooler;
    }
  }

  if (!normalizedDirect) return undefined;

  if (isVercelRuntime() && /db\.[a-z0-9]+\.supabase\.co:5432/i.test(normalizedDirect)) {
    const pooler = toSupabasePoolerUrl(normalizedDirect);
    if (pooler) {
      if (process.env.NODE_ENV === "production") {
        console.info(
          "[db] Vercel: usando connection pooler Supabase (porta 6543). " +
            "Defina SUPABASE_REGION (ex. sa-east-1) se falhar; ou DATABASE_POOLER_URL do painel Connect."
        );
      }
      return pooler;
    }
  }

  return normalizedDirect;
}

/** Garante DATABASE_URL no process.env antes do Prisma (build + runtime). */
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

  const rawDirect = process.env.DATABASE_URL?.trim()
    ? stripQuotes(process.env.DATABASE_URL)
    : undefined;

  if (rawDirect && !process.env.DIRECT_URL?.trim()) {
    const normalizedDirect = normalizeDatabaseUrl(rawDirect);
    if (normalizedDirect && /:5432\//.test(normalizedDirect)) {
      process.env.DIRECT_URL = normalizedDirect;
    }
  }

  const normalizedDirect = rawDirect ? normalizeDatabaseUrl(rawDirect) : undefined;
  const runtime = pickRuntimeUrl(normalizedDirect);

  if (runtime) {
    process.env.DATABASE_URL = runtime;
    return;
  }

  for (const key of ENV_DATABASE_KEYS) {
    const raw = process.env[key];
    if (!raw?.trim()) continue;
    const normalized = normalizeDatabaseUrl(raw);
    if (normalized) process.env[key] = normalized;
  }
}

export function getDatabaseUrl(): string | undefined {
  applyDatabaseEnv();
  return process.env.DATABASE_URL ? normalizeDatabaseUrl(process.env.DATABASE_URL) : undefined;
}

export function isDatabaseConfigured(): boolean {
  const url = getDatabaseUrl();
  return Boolean(url && /^postgres(ql)?:\/\//i.test(url));
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
