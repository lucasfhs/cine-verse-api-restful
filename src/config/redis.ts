// redis.ts
import Redis from "ioredis";
import Logger from "./logger";
// Singleton - Class
class RedisDB {
  private static redisInstance: Redis;
  private constructor() {}
  public static getInstance(): Redis {
    if (!this.redisInstance) {
      this.redisInstance = new Redis({
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        db: Number(process.env.REDIS_DB) || 0,
      });
      this.redisInstance.on("connect", () => {
        Logger.info("Successfully connected to redis.");
      });

      this.redisInstance.on("error", (err) => {
        Logger.error(`(Redis) Database connection failed: ${err.message}`);
        process.exit(1);
      });
    }
    return this.redisInstance;
  }
}
export default RedisDB.getInstance();
