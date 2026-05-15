import { timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyStoredPassword } from "@/lib/password";
import { getDatabaseUrl, isDatabaseConfigured } from "@/lib/db";
import { ENV_PUBLISHER_ID } from "@/lib/publish-constants";

export { ENV_PUBLISHER_ID } from "@/lib/publish-constants";

export type PublisherAuthResult =
  | { ok: true; id: string; email: string; name: string; source: "database" | "env" }
  | { ok: false; code: "no_database" | "db_error" | "not_found" | "wrong_password" | "no_permission" };

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) {
    timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

import { usesEnvPublishCredentials } from "@/lib/publish-constants";

export { usesEnvPublishCredentials } from "@/lib/publish-constants";

function verifyEnvPublishCredentials(username: string, password: string) {
  const expectedUser = process.env.USERNAME?.trim() ?? "";
  const expectedPass = process.env.PASSWORD ?? "";
  if (!expectedUser || !expectedPass) return false;
  return safeEqual(username.trim(), expectedUser) && safeEqual(password, expectedPass);
}

export function envPublisherDisplayName() {
  return process.env.USERNAME?.trim() || "Redação";
}

/** Login pela tabela public."User" no Supabase (e-mail + senha). */
export async function authenticatePublisher(
  username: string,
  password: string
): Promise<PublisherAuthResult> {
  const identifier = username.trim();
  const identifierLower = identifier.toLowerCase();

  if (!isDatabaseConfigured()) {
    if (usesEnvPublishCredentials() && verifyEnvPublishCredentials(identifier, password)) {
      return {
        ok: true,
        id: ENV_PUBLISHER_ID,
        email: `${identifierLower}@publish.local`,
        name: envPublisherDisplayName(),
        source: "env",
      };
    }
    return { ok: false, code: "no_database" };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: identifierLower, mode: "insensitive" } },
          { email: identifierLower },
          { name: { equals: identifier, mode: "insensitive" } },
        ],
      },
    });

    if (!user) {
      if (usesEnvPublishCredentials() && verifyEnvPublishCredentials(identifier, password)) {
        return {
          ok: true,
          id: ENV_PUBLISHER_ID,
          email: `${identifierLower}@publish.local`,
          name: envPublisherDisplayName(),
          source: "env",
        };
      }
      return { ok: false, code: "not_found" };
    }

    if (!user.canPublish) {
      return { ok: false, code: "no_permission" };
    }

    const valid = await verifyStoredPassword(password, user.password);
    if (!valid) {
      return { ok: false, code: "wrong_password" };
    }

    return {
      ok: true,
      id: user.id,
      email: user.email,
      name: user.name,
      source: "database",
    };
  } catch (error) {
    console.error("[publish-auth] erro ao consultar User:", error, "url?", Boolean(getDatabaseUrl()));
    return { ok: false, code: "db_error" };
  }
}

export function authErrorMessage(result: Extract<PublisherAuthResult, { ok: false }>): string {
  switch (result.code) {
    case "no_database":
      return 'Banco não configurado. Na Vercel, defina DATABASE_URL (pode ser no formato postgres:SENHA@db.xxx.supabase.co:5432/postgres — o site adiciona postgresql:// automaticamente).';
    case "db_error":
      return "Não foi possível conectar ao banco. Confira se a senha em DATABASE_URL está correta (Settings → Database no Supabase). Se a senha tiver @ ou #, codifique na URL (%40, %23). Formato aceito: postgres:SENHA@db.xxx.supabase.co:5432/postgres";
    case "not_found":
      return "E-mail não encontrado. Use um cadastro da tabela User com canPublish = true.";
    case "no_permission":
      return "Esta conta não tem permissão para publicar (canPublish = false).";
    case "wrong_password":
      return "Senha incorreta. Contas do seed usam a senha altere-esta-senha (se não foi alterada).";
    default:
      return "Falha no login.";
  }
}

/** Autor no banco para posts publicados via login de ambiente. */
export async function getOrCreateEnvPublisherAuthorId() {
  const username = process.env.USERNAME?.trim() ?? "redacao";
  const email = `${username.toLowerCase().replace(/[^a-z0-9._-]/g, "-")}@publish.mobilizapiraquara.local`;

  const passwordHash = await hashPassword(process.env.PASSWORD ?? "unused");

  const user = await prisma.user.upsert({
    where: { email },
    update: { name: envPublisherDisplayName(), canPublish: true },
    create: {
      email,
      name: envPublisherDisplayName(),
      password: passwordHash,
      canPublish: true,
    },
  });

  return user.id;
}
