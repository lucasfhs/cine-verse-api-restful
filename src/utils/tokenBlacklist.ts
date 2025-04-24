import redis from "../config/redis";

export class TokenBlackList {
  private redisInstance: any;

  constructor(redisClient?: any) {
    // Permite injetar um mock no teste, ou usar o redis real na produção
    this.redisInstance = redisClient || redis.getInstance();
  }

  async blacklistToken(token: string, expiresInSeconds: number): Promise<void> {
    await this.redisInstance.set(
      `blacklist:${token}`,
      "true",
      "EX",
      expiresInSeconds
    );
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.redisInstance.get(`blacklist:${token}`);
    return result !== null;
  }
}
