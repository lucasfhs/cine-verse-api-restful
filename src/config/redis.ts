// redis.ts
import Redis from "ioredis";
import Logger from "./logger";

class RedisDB {
  private static redisInstance: Redis;
  private static isConnected: boolean = false;

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
        this.isConnected = true;
        Logger.info("Successfully connected to Redis.");
      });

      this.redisInstance.on("error", (err) => {
        this.isConnected = false;
        Logger.error(`(Redis) Database connection failed: ${err.message}`);
        process.exit(1);
      });

      this.redisInstance.on("close", () => {
        this.isConnected = false;
        Logger.info("Redis connection closed.");
      });
    }
    return this.redisInstance;
  }

  public static getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public static async disconnect(): Promise<void> {
    try {
      if (this.redisInstance && this.isConnected) {
        await this.redisInstance.quit();
        this.isConnected = false;
        Logger.info("Successfully disconnected from Redis.");
      }
    } catch (err: any) {
      Logger.error(`(Redis) Disconnection failed: ${err.message}`);
    }
  }
}

export default RedisDB;
