const POOLER_ENV_KEYS = ["DATABASE_POOLER_URL", "SUPABASE_POOLER_URL"] as const;

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

/** URL copiada do painel Supabase — não alterar (evita tenant not found). */
function isSupabasePanelUrl(url: string): boolean {
  return /postgres\.[a-z0-9]+@.*\.supabase\.co/i.test(url);
}

function isSessionPoolerUrl(url: string): boolean {
  return /pooler\.supabase\.com/i.test(url) && /:5432(\/|$|\?)/.test(url);
}

function isTransactionPoolerUrl(url: string): boolean {
  return /pooler\.supabase\.com/i.test(url) && /:6543(\/|$|\?)/.test(url);
}

/**
 * Formato curto: postgres:SENHA@db.xxx.supabase.co:5432/postgres
 * → postgresql://postgres:SENHA@db.xxx.supabase.co:5432/postgres
 */
export function normalizeDatabaseUrl(raw?: string): string | undefined {
  if (!raw?.trim()) return undefined;

  const url = stripQuotes(raw);

  if (isSupabasePanelUrl(url)) {
    return url;
  }

  if (/^postgres(ql)?:\/\//i.test(url)) {
    return url;
  }

  if (/^postgres:/i.test(url) && url.includes("@")) {
    const rest = url.replace(/^postgres:/i, "");
    const path = rest.startsWith("//") ? rest.slice(2) : rest;
    return `postgresql://postgres:${path}`;
  }

  if (url.includes("@") && !url.includes("://")) {
    return `postgresql://postgres:${url}`;
  }

  return url;
}

export function applyDatabaseEnv(): void {
  for (const key of ["DATABASE_URL", "DIRECT_URL", ...POOLER_ENV_KEYS] as const) {
    const raw = process.env[key];
    if (!raw?.trim()) continue;
    const normalized = normalizeDatabaseUrl(raw);
    if (normalized) process.env[key] = normalized;
  }
}

/**
 * URL usada pelo Prisma em runtime.
 * Preferência: DIRECT_URL (session pooler :5432) — estável com Prisma.
 * O transaction pooler (:6543) costuma dar "tenant/user ... not found".
 */
export function getPrismaDatabaseUrl(): string | undefined {
  applyDatabaseEnv();

  for (const key of POOLER_ENV_KEYS) {
    const raw = process.env[key]?.trim();
    if (raw) return normalizeDatabaseUrl(raw);
  }

  const direct = process.env.DIRECT_URL?.trim();
  if (direct) {
    return normalizeDatabaseUrl(direct);
  }

  const database = process.env.DATABASE_URL?.trim();
  if (!database) return undefined;

  if (isTransactionPoolerUrl(database) && !direct) {
    console.warn(
      "[db] DATABASE_URL usa transaction pooler (:6543). " +
        "Defina DIRECT_URL (session :5432) do painel Supabase para o Prisma."
    );
  }

  return normalizeDatabaseUrl(database);
}

export function getDatabaseUrl(): string | undefined {
  return getPrismaDatabaseUrl();
}

export function getDirectDatabaseUrl(): string | undefined {
  applyDatabaseEnv();
  const url = process.env.DIRECT_URL?.trim();
  return url ? normalizeDatabaseUrl(url) : undefined;
}

export function isDatabaseConfigured(): boolean {
  const url = getPrismaDatabaseUrl();
  return Boolean(url && /^postgres(ql)?:\/\//i.test(url));
}

export function logDatabaseTarget(): void {
  const url = getPrismaDatabaseUrl();
  if (!url) return;
  const mode = isSessionPoolerUrl(url) ? "session :5432" : isTransactionPoolerUrl(url) ? "transaction :6543" : "postgres";
  console.info(`[db] Prisma (${mode}) →`, url.replace(/:([^:@/]+)@/, ":***@"));
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
