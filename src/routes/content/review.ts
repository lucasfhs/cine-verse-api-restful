import { Router } from "express";
import {
  findOneReviewValidation,
  reviewCreateValidation,
  updateReviewValidation,
  deleteOneReviewValidation,
} from "../../middleware/validators/content/reviewValidator";
import { validate } from "../../middleware/handleValidator";
import { followController } from "../../controllers/social/follow";
const router = Router();
router.get("/review", followController.findAll);
router.get(
  "/review/:id",
  findOneReviewValidation(),
  validate,
  followController.findOne
);
router.post(
  "/review",
  reviewCreateValidation(),
  validate,
  followController.createOne
);
router.put(
  "/review/:id",
  updateReviewValidation(),
  validate,
  followController.updateOne
);
router.delete(
  "/review/:id",
  deleteOneReviewValidation(),
  validate,
  followController.deleteOne
);

export default router;
