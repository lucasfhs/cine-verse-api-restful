// controllers/DirectorController.ts
import { DirectorModel } from "../../models/core/Director";
import { BaseController } from "../BaseController";

export const directorController = new BaseController(DirectorModel, "Director");
