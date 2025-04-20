import { Request, Response, Router } from "express";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Movie Api!",
    version: "1.0.0",
    documentation: "/api-docs",
    author: "github.com/lucasfhs",
  });
});

export default router;
