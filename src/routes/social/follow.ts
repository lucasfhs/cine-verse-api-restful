import { Router } from "express";
import { followController } from "../../controllers/social/follow";
import {
  findOneFollowValidation,
  followCreateValidation,
  updateFollowValidation,
  deleteOneFollowValidation,
} from "../../middleware/validators/social/followValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/follow", followController.findAll);
router.get(
  "/follow/:id",
  findOneFollowValidation(),
  validate,
  followController.findOne
);
router.post(
  "/follow",
  followCreateValidation(),
  validate,
  followController.createOne
);
router.put(
  "/follow/:id",
  updateFollowValidation(),
  validate,
  followController.updateOne
);
router.delete(
  "/follow/:id",
  deleteOneFollowValidation(),
  validate,
  followController.deleteOne
);

export default router;
