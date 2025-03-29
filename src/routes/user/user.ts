import { Request, Response, Router } from "express";
const router = Router();
import Logger from "../../config/logger";
const users: string[] = ["Josefina", "Maria", "Paula", "Larissa"];
router.get("/user", (req: Request, res: Response) => {
  res.status(200).json({ result: users });
  Logger.info(`Usuario Pediu Requisicao /users`);
});
export default router;
