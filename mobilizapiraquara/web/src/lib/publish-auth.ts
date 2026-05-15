import { timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";

export const ENV_PUBLISHER_ID = "env-publisher";

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) {
    timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

export function usesEnvPublishCredentials() {
  return Boolean(process.env.USERNAME?.trim() && process.env.PASSWORD);
}

export function verifyEnvPublishCredentials(username: string, password: string) {
  const expectedUser = process.env.USERNAME?.trim() ?? "";
  const expectedPass = process.env.PASSWORD ?? "";
  if (!expectedUser || !expectedPass) return false;
  return safeEqual(username.trim(), expectedUser) && safeEqual(password, expectedPass);
}

export function envPublisherDisplayName() {
  return process.env.USERNAME?.trim() || "Redação";
}

/** Login: banco (e-mail + bcrypt) e, se configurado, USERNAME/PASSWORD da Vercel. */
export async function authenticatePublisher(username: string, password: string) {
  const identifier = username.trim();
  const identifierLower = identifier.toLowerCase();

  if (isDatabaseConfigured()) {
    const user = await prisma.user.findFirst({
      where: {
        canPublish: true,
        OR: [
          { email: { equals: identifierLower, mode: "insensitive" } },
          { name: { equals: identifier, mode: "insensitive" } },
        ],
      },
    });

    if (user && (await verifyPassword(password, user.password))) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        source: "database" as const,
      };
    }
  }

  if (usesEnvPublishCredentials() && verifyEnvPublishCredentials(identifier, password)) {
    return {
      id: ENV_PUBLISHER_ID,
      email: `${identifierLower}@publish.local`,
      name: envPublisherDisplayName(),
      source: "env" as const,
    };
  }

  return null;
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
