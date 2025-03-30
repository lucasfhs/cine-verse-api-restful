import { Request, Response, Router } from "express";
import userRoutes from "./user/user";
import movieRoutes from "./movie/movie";
import morganMiddleware from "../middleware/morgan";

const router = Router();
router.use(morganMiddleware);
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the API! Consult the documentation at /api-docs.",
  });
});
router.use(userRoutes);
router.use(movieRoutes);

export default router;
