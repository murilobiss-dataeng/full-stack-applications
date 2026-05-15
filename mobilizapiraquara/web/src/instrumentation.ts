export async function register() {
  const { applyDatabaseEnv } = await import("@/lib/db");
  applyDatabaseEnv();
}
