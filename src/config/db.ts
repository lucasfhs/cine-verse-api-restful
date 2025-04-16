import mongoose from "mongoose";
import "dotenv/config";
import Logger from "./logger";

export default async function connect() {
  try {
    const dbUri =
      process.env.MONGO_DB_URI || "mongodb://localhost:27017/expressApi";
    if (!dbUri) {
      throw new Error("Db URI cannot be null.");
    }

    await mongoose.connect(dbUri);

    Logger.info("Successfully connected to MongoDB server");
  } catch (error: any) {
    Logger.error(`(MongoDB) Database connection failed: ${error.message}`);
    process.exit(1);
  }
}
