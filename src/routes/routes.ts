import { Request, Response, Router } from "express";
import userRoutes from "./user/user";
const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the API! Consult the documentation at /api-docs.",
  });
});
router.use(userRoutes);

export default router;
