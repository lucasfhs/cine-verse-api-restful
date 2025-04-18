import app from "./src/app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
import Logger from "./src/config/logger";
import Database from "./src/config/database";
app.listen(port, async () => {
  await Database.getInstance();
  Logger.info(`Server Started on http://localhost:${port}`);
});
