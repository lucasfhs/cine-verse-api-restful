import { Request, Response, Router } from "express";
const router = Router();
const users: string[] = ["Josefina", "Maria", "Paula", "Larissa"];
router.get("/user", (req: Request, res: Response) => {
  res.status(200).json({ result: users });
});
export default router;
