// controllers/ReviewController.ts
import { ListModel } from "../../models/content/List";
import { BaseController } from "../BaseController";

export const listController = new BaseController(ListModel, "List");
