import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/routes";
import authRoutes from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
const app = express();

/* Middleware JSON */
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(authMiddleware);
app.use(router);

export default app;
