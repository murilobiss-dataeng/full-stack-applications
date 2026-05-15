export const ENV_PUBLISHER_ID = "env-publisher";

export function usesEnvPublishCredentials() {
  return Boolean(process.env.USERNAME?.trim() && process.env.PASSWORD);
}
