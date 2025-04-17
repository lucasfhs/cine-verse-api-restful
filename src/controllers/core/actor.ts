// controllers/ActorController.ts
import { ActorModel } from "../../models/core/Actor";
import { BaseController } from "../BaseController";

export const actorController = new BaseController(ActorModel, "Actor");
