// controllers/ReviewController.ts
import { ReviewModel } from "@/models/content/Review";
import { BaseController } from "../BaseController";

export const reviewController = new BaseController(ReviewModel, "Review");
