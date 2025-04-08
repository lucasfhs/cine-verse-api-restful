import { Router } from "express";
import {
  findOneLike,
  findAllLikes,
  createOneLike,
  updateOneLike,
  deleteOneLike,
} from "../../controllers/content/like";
import {
  findOneLikeValidation,
  likeCreateValidation,
  updateLikeValidation,
  deleteOneLikeValidation,
} from "../../middleware/validators/content/likeValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/Like", findAllLikes);
router.get("/like/:id", findOneLikeValidation(), validate, findOneLike);
router.post("/like", likeCreateValidation(), validate, createOneLike);
router.put("/like/:id", updateLikeValidation(), validate, updateOneLike);
router.delete("/like/:id", deleteOneLikeValidation(), validate, deleteOneLike);

export default router;
