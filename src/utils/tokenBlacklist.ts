import redis from "../config/redis";
const redisInstance = redis.getInstance();

export async function blacklistToken(token: string, expiresInSeconds: number) {
  await redisInstance.set(`blacklist:${token}`, "true", "EX", expiresInSeconds);
}

export async function isTokenBlacklisted(token: string): Promise<boolean> {
  const result = await redisInstance.get(`blacklist:${token}`);
  return result !== null;
}
