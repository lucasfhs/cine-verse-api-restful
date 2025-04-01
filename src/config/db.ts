import mongoose from "mongoose";
import "dotenv/config";
import Logger from "./logger";

/**
 * Connects to the MongoDB database using the URI from environment variables.
 * @async
 * @function connect
 * @returns {Promise<void>} A promise that resolves when the connection is established or rejects on failure.
 * @throws {Error} If the MONGO_DB_URI environment variable is not set.
 * @example
 * // Usage:
 * connect()
 *   .then(() => console.log('Connected to DB'))
 *   .catch(err => console.error('Connection failed', err));
 */
export default async function connect() {
  try {
    const dbUri = process.env.MONGO_DB_URI;
    if (!dbUri) {
      throw new Error("Db URI cannot be null.");
    }

    await mongoose.connect(dbUri);

    Logger.info("Successfully connected to MongoDB server");
  } catch (error: any) {
    Logger.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
}
