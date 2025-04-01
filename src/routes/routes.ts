import { Request, Response, Router } from "express";
import userRoutes from "./user/user";
import movieRoutes from "./core/movie";
import morganMiddleware from "../middleware/morgan";

const router = Router();
router.use(morganMiddleware);

router.use(userRoutes);
router.use(movieRoutes);

export default router;
