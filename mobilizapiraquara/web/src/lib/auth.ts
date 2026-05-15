import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  ENV_PUBLISHER_ID,
  usesEnvPublishCredentials,
} from "@/lib/publish-auth";

const COOKIE_NAME = "mp_session";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "dev-secret-change-in-production-min-32-chars"
);

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  canPublish: boolean;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    canPublish: user.canPublish,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  cookies().delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.sub || typeof payload.email !== "string" || typeof payload.name !== "string") {
      return null;
    }
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      canPublish: payload.canPublish === true,
    };
  } catch {
    return null;
  }
}

/** Exige sessão válida de publicador (env USERNAME/PASSWORD ou usuário canPublish no banco). */
export async function requirePublisher(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session?.canPublish) return null;

  if (usesEnvPublishCredentials() && session.id === ENV_PUBLISHER_ID) {
    return session;
  }

  if (!process.env.DATABASE_URL) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, name: true, canPublish: true },
  });

  if (!user?.canPublish) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    canPublish: true,
  };
}
