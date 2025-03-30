import app from "./src/app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
import db from "./src/config/db";
import Logger from "./src/config/logger";
app.listen(port, async () => {
  await db();
  Logger.info(`Server Started on http://localhost:${port}`);
});
