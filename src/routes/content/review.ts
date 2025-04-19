import { Router } from "express";
import {
  findOneReviewValidation,
  reviewCreateValidation,
  updateReviewValidation,
  deleteOneReviewValidation,
} from "../../middleware/validators/content/reviewValidator";
import { validate } from "../../middleware/handleValidator";
import { reviewController } from "../../controllers/content/review";
const router = Router();
router.get("/review", reviewController.findAll);
router.get(
  "/review/:id",
  findOneReviewValidation(),
  validate,
  reviewController.findOne
);
router.post(
  "/review",
  reviewCreateValidation(),
  validate,
  reviewController.createOne
);
router.put(
  "/review/:id",
  updateReviewValidation(),
  validate,
  reviewController.updateOne
);
router.delete(
  "/review/:id",
  deleteOneReviewValidation(),
  validate,
  reviewController.deleteOne
);

export default router;
