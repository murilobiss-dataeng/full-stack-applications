import { PrismaClient } from "@prisma/client";
import { applyDatabaseEnv, getDatabaseUrl } from "@/lib/db";

applyDatabaseEnv();

const databaseUrl = getDatabaseUrl();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: databaseUrl
      ? {
          db: { url: databaseUrl },
        }
      : undefined,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
