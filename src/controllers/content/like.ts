// controllers/ReviewController.ts
import { LikeModel } from "@/models/content/Like";
import { BaseController } from "../BaseController";

export const likeController = new BaseController(LikeModel, "Like");
