import { timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyStoredPassword } from "@/lib/password";
import { getDatabaseUrl, isDatabaseConfigured } from "@/lib/db";
import { SITE } from "@/lib/constants";
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
  return safeEqual(username.trim(), expectedUser) && safeEqual(password.trim(), expectedPass);
}

export function envPublisherDisplayName() {
  return process.env.USERNAME?.trim() || "Redação";
}

/** E-mails candidatos (completo ou só o usuário antes do @). */
function candidateEmails(identifier: string, identifierLower: string): string[] {
  const emails = new Set<string>();
  emails.add(identifierLower);

  if (identifier.includes("@")) {
    const local = identifierLower.split("@")[0];
    if (local) emails.add(`${local}@${SITE.publisherEmailDomain}`);
  } else {
    emails.add(`${identifierLower}@${SITE.publisherEmailDomain}`);
  }

  return Array.from(emails);
}

async function findPublisherByIdentifier(identifier: string, identifierLower: string) {
  for (const email of candidateEmails(identifier, identifierLower)) {
    const byEmail = await prisma.user.findUnique({ where: { email } });
    if (byEmail) return byEmail;
  }

  return prisma.user.findFirst({
    where: {
      canPublish: true,
      name: { equals: identifier, mode: "insensitive" },
    },
  });
}

/**
 * Login da redação — consulta a tabela public."User" (campo password).
 * Não usa a senha do DATABASE_URL (essa é só para o servidor conectar ao Postgres).
 */
export async function authenticatePublisher(
  username: string,
  password: string
): Promise<PublisherAuthResult> {
  const identifier = username.trim();
  const identifierLower = identifier.toLowerCase();
  const passwordTrimmed = password.trim();

  if (!isDatabaseConfigured()) {
    if (usesEnvPublishCredentials() && verifyEnvPublishCredentials(identifier, passwordTrimmed)) {
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
    const user = await findPublisherByIdentifier(identifier, identifierLower);

    if (!user) {
      if (usesEnvPublishCredentials() && verifyEnvPublishCredentials(identifier, passwordTrimmed)) {
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

    const valid = await verifyStoredPassword(passwordTrimmed, user.password);
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
      return (
        "O site não consegue consultar a tabela User (falta DATABASE_URL na Vercel). " +
        "Isso é a senha de conexão do Postgres no Supabase — não é a senha do seu login de redação."
      );
    case "db_error":
      return (
        "O site não conseguiu consultar a tabela User no Postgres. " +
        "Isso é problema da DATABASE_URL na Vercel (senha de conexão do banco no Supabase → Settings → Database), " +
        "não da senha que você digita no formulário. " +
        "Seu login (manco / manco) fica na coluna password da tabela User — só funciona depois que a conexão estiver ok."
      );
    case "not_found":
      return (
        "E-mail não encontrado na tabela User. " +
        "Use manco@mobilizapiraquara.com.br ou admin@mobilizapiraquara.com.br (com canPublish = true)."
      );
    case "no_permission":
      return "Esta conta existe na tabela User, mas canPublish = false (sem permissão para publicar).";
    case "wrong_password":
      return (
        "Senha incorreta para este e-mail na tabela User. " +
        'Conta manco@…: senha "manco" (texto no banco). ' +
        'Admin/redator2: "altere-esta-senha" se estiver com hash bcrypt do seed.'
      );
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
