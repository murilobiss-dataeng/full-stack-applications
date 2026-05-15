import { timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) {
    timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

/** Aceita bcrypt ($2...) ou senha em texto (legado no banco). */
export async function verifyStoredPassword(plain: string, stored: string) {
  const hash = stored?.trim() ?? "";
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$")) {
    return bcrypt.compare(plain, hash);
  }
  return safeEqual(plain, hash);
}
