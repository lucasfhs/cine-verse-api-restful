import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/routes";
import { authMiddleware } from "./middleware/auth";
import { setupSwagger } from "./config/swaggerConfig";
import welcomeRoute from "./routes/welcome";
import authRoutes from "./routes/core/auth";
const app = express();

/* Middleware JSON */
app.use(express.json());
app.use(cookieParser());
setupSwagger(app);
app.use(welcomeRoute);
app.use(authRoutes);
app.use(authMiddleware);
app.use(router);

export default app;
