// blacklist.ts
import redis from "../config/redis";

// Adiciona o token à blacklist
export async function blacklistToken(token: string, expiresInSeconds: number) {
  await redis.set(`blacklist:${token}`, "true", "EX", expiresInSeconds);
}

// Verifica se o token está na blacklist
export async function isTokenBlacklisted(token: string): Promise<boolean> {
  const result = await redis.get(`blacklist:${token}`);

  return !result;
}
