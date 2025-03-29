import app from "./src/app";
import "dotenv/config";
const port = process.env.PORT || 3000;
import db from "./src/config/db";
import Logger from "./src/config/logger";
app.listen(port, async () => {
  await db();
  console.log(`Server Started on http://localhost:${port}`);
  Logger.info("Server Started");
});
