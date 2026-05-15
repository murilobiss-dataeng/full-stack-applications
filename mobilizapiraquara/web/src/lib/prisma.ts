import { PrismaClient } from "@prisma/client";
import { applyDatabaseEnv, getDatabaseUrl, getDirectDatabaseUrl, logDatabaseTarget } from "@/lib/db";

function createPrismaClient() {
  applyDatabaseEnv();
  const databaseUrl = getDatabaseUrl();
  const directUrl = getDirectDatabaseUrl();
  if (directUrl) {
    process.env.DIRECT_URL = directUrl;
  }

  if (process.env.NODE_ENV === "production") {
    logDatabaseTarget();
  }

  return new PrismaClient({
    datasources: databaseUrl
      ? {
          db: { url: databaseUrl },
        }
      : undefined,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
