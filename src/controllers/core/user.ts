// controllers/UserController.ts
import { UserModel } from "../../models/core/User";
import { BaseController } from "../BaseController";

export const userController = new BaseController(UserModel, "User");
