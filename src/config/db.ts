import mongoose from "mongoose";
import "dotenv/config";
import Logger from "./logger";
export default async function connect() {
  try {
    const dbUri = process.env.MONGO_DB_URI;
    if (typeof dbUri == "undefined") {
      throw new Error("Db uri cannot be null.");
    }
    mongoose.connect(dbUri);
    Logger.info("Successfully connected to mongodb server");
  } catch (error: any) {
    Logger.error(error.message);
  }
}
