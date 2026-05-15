/** URL do Postgres (Supabase: postgres:// ou postgresql://). */
export function getDatabaseUrl(): string | undefined {
  return (process.env.DATABASE_URL ?? process.env.DIRECT_URL)?.trim() || undefined;
}

export function isDatabaseConfigured(): boolean {
  const url = getDatabaseUrl();
  return Boolean(url && /^postgres(ql)?:\/\//i.test(url));
}

/** Executa query no banco; em falha usa fallback (mock) para não quebrar o deploy. */
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
