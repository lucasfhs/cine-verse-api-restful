import { Router } from "express";
import {
  findOneReview,
  findAllReviews,
  createOneReview,
  updateOneReview,
  deleteOneReview,
} from "../../controllers/content/review";
import {
  findOneReviewValidation,
  reviewCreateValidation,
  updateReviewValidation,
  deleteOneReviewValidation,
} from "../../middleware/validators/content/reviewValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/review", findAllReviews);
router.get("/review/:id", findOneReviewValidation(), validate, findOneReview);
router.post("/review", reviewCreateValidation(), validate, createOneReview);
router.put("/review/:id", updateReviewValidation(), validate, updateOneReview);
router.delete(
  "/review/:id",
  deleteOneReviewValidation(),
  validate,
  deleteOneReview
);

export default router;
