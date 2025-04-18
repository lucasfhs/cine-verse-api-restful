// database.ts
import mongoose from "mongoose";
import Logger from "./logger";
// Singleton
class Database {
  private static instance: Database;
  private static isConnected: boolean = false;

  private constructor() {}

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database();
      await Database.instance.connect();
    }

    return Database.instance;
  }

  private async connect(): Promise<void> {
    try {
      const dbUri =
        process.env.MONGO_DB_URI || "mongodb://localhost:27017/expressApi";

      if (!dbUri) {
        throw new Error("Db URI cannot be null.");
      }

      await mongoose.connect(dbUri);
      Database.isConnected = true;
      Logger.info("Successfully connected to MongoDB server");
    } catch (error: any) {
      Logger.error(`(MongoDB) Database connection failed: ${error.message}`);
      process.exit(1);
    }
  }

  public static async disconnect(): Promise<void> {
    try {
      if (Database.isConnected) {
        await mongoose.disconnect();
        Database.isConnected = false;
        Logger.info("Disconnected from MongoDB server");
      }
    } catch (error: any) {
      Logger.error(`(MongoDB) Disconnection failed: ${error.message}`);
    }
  }

  public static getConnectionStatus(): boolean {
    return Database.isConnected;
  }
}

export default Database;
