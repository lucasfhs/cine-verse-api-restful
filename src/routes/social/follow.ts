import { Router } from "express";
import {
  findOneFollow,
  findAllFollows,
  createOneFollow,
  updateOneFollow,
  deleteOneFollow,
} from "../../controllers/social/follow";
import {
  findOneFollowValidation,
  followCreateValidation,
  updateFollowValidation,
  deleteOneFollowValidation,
} from "../../middleware/validators/social/followValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/follow", findAllFollows);
router.get("/follow/:id", findOneFollowValidation(), validate, findOneFollow);
router.post("/follow", followCreateValidation(), validate, createOneFollow);
router.put("/follow/:id", updateFollowValidation(), validate, updateOneFollow);
router.delete(
  "/follow/:id",
  deleteOneFollowValidation(),
  validate,
  deleteOneFollow
);

export default router;
