import mongoose from "mongoose";
import "dotenv/config";

export default async function connect() {
  try {
    const dbUri = process.env.MONGO_DB_URI;
    if (typeof dbUri == "undefined") {
      throw new Error("Db uri cannot be null.");
    }
    mongoose.connect(dbUri);
    console.log("Successfully connected to mongodb server.");
  } catch (error: any) {
    console.error(error.message);
  }
}
