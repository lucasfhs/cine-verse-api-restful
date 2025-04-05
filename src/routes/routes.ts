import { Request, Response, Router } from "express";
import actorRoutes from "./core/actor";
import movieRoutes from "./core/movie";
import userRoutes from "./core/user";
import directorRoutes from "./core/director";
import followRoutes from "./social/follow";
import morganMiddleware from "../middleware/morgan";

const router = Router();
router.use(morganMiddleware);
router.use(userRoutes);
router.use(movieRoutes);
router.use(actorRoutes);
router.use(directorRoutes);
router.use(followRoutes);
export default router;
