import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/db";
import { ENV_PUBLISHER_ID, usesEnvPublishCredentials } from "@/lib/publish-constants";
import { verifyStoredPassword } from "@/lib/password";

export { hashPassword, verifyStoredPassword } from "@/lib/password";

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

export async function verifyPassword(password: string, hash: string) {
  return verifyStoredPassword(password, hash);
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

export async function requirePublisher(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session?.canPublish) return null;

  if (session.id === ENV_PUBLISHER_ID) {
    return usesEnvPublishCredentials() ? session : null;
  }

  if (!isDatabaseConfigured()) {
    return session;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, email: true, name: true, canPublish: true },
    });
    if (user?.canPublish) {
      return { id: user.id, email: user.email, name: user.name, canPublish: true };
    }
  } catch {
    return session;
  }

  return null;
}
