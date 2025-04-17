import { Router } from "express";

import { likeController } from "../../controllers/content/like";
import {
  findOneLikeValidation,
  likeCreateValidation,
  updateLikeValidation,
  deleteOneLikeValidation,
} from "../../middleware/validators/content/likeValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/like", likeController.findAll);
router.get(
  "/like/:id",
  findOneLikeValidation(),
  validate,
  likeController.findOne
);
router.post(
  "/like",
  likeCreateValidation(),
  validate,
  likeController.createOne
);
router.put(
  "/like/:id",
  updateLikeValidation(),
  validate,
  likeController.updateOne
);
router.delete(
  "/like/:id",
  deleteOneLikeValidation(),
  validate,
  likeController.deleteOne
);

export default router;
