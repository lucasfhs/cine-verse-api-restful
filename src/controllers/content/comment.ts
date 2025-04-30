// controllers/ReviewController.ts
import { CommentModel } from "@/models/content/Comment";
import { BaseController } from "../BaseController";

export const commentController = new BaseController(CommentModel, "Comment");
