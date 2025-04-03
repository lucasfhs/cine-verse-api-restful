import { Request, Response, Router } from "express";
import actorRoutes from "./core/actor";
import movieRoutes from "./core/movie";
import userRoutes from "./core/user";
import morganMiddleware from "../middleware/morgan";

const router = Router();
router.use(morganMiddleware);
router.use(userRoutes);
router.use(movieRoutes);
router.use(actorRoutes);
export default router;
