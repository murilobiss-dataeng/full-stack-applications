/** Verifica se há URL de banco configurada (evita falha de build na Vercel). */
export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && url.startsWith("postgresql"));
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
