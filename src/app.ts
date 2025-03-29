import express from "express";

import router from "./routes/routes";
const app = express();

/* Middleware JSON */
app.use(express.json());
app.use(router);

export default app;
