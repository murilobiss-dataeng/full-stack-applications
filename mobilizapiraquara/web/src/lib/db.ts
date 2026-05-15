/** Corrige DATABASE_URL incompleta (ex.: postgres:senha@host sem postgresql://). */
export function normalizeDatabaseUrl(raw?: string): string | undefined {
  if (!raw?.trim()) return undefined;

  const url = raw.trim();

  if (/^postgres(ql)?:\/\//i.test(url)) {
    return url;
  }

  // postgres:senha@host:5432/db  →  postgresql://postgres:senha@host:5432/db
  if (/^postgres:/i.test(url) && url.includes("@")) {
    const rest = url.replace(/^postgres:/i, "");
    const path = rest.startsWith("//") ? rest.slice(2) : rest;
    return `postgresql://postgres:${path}`;
  }

  // host:5432/db com @ mas sem protocolo
  if (url.includes("@") && !url.includes("://")) {
    return `postgresql://postgres:${url}`;
  }

  return url;
}

export function getDatabaseUrl(): string | undefined {
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
