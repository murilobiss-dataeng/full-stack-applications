const ENV_DATABASE_KEYS = ["DATABASE_URL", "DIRECT_URL"] as const;

const FALLBACK_ENV_KEYS = [
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL",
  "POSTGRES_URL_NON_POOLING",
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

/** SSL e pooler exigidos pelo Supabase em deploy serverless (Vercel). */
function withSupabaseDefaults(url: string): string {
  if (!/supabase\.co/i.test(url)) return url;

  let result = url;
  result = appendQueryParam(result, "sslmode", "require");

  if (/:6543\//.test(result) || /pooler\.supabase\.com/i.test(result)) {
    result = appendQueryParam(result, "pgbouncer", "true");
  }

  return result;
}

/**
 * Aceita o formato salvo na Vercel:
 *   postgres:SENHA@db.xxx.supabase.co:5432/postgres
 * e converte para:
 *   postgresql://postgres:SENHA@db.xxx.supabase.co:5432/postgres?sslmode=require
 */
export function normalizeDatabaseUrl(raw?: string): string | undefined {
  if (!raw?.trim()) return undefined;

  const url = stripQuotes(raw);

  if (/^postgres(ql)?:\/\//i.test(url)) {
    return withSupabaseDefaults(url);
  }

  // postgres:senha@host:5432/db  →  postgresql://postgres:senha@host:5432/db
  if (/^postgres:/i.test(url) && url.includes("@")) {
    const rest = url.replace(/^postgres:/i, "");
    const path = rest.startsWith("//") ? rest.slice(2) : rest;
    return withSupabaseDefaults(`postgresql://postgres:${path}`);
  }

  // senha@host:5432/db (sem protocolo nem usuário)
  if (url.includes("@") && !url.includes("://")) {
    return withSupabaseDefaults(`postgresql://postgres:${url}`);
  }

  return url;
}

/** Garante DATABASE_URL no process.env antes do Prisma (build + runtime). */
export function applyDatabaseEnv(): void {
  if (!process.env.DATABASE_URL?.trim()) {
    for (const key of FALLBACK_ENV_KEYS) {
      const value = process.env[key];
      if (value?.trim()) {
        process.env.DATABASE_URL = stripQuotes(value);
        break;
      }
    }
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
  const raw = process.env.DATABASE_URL ?? process.env.DIRECT_URL;
  return normalizeDatabaseUrl(raw);
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
