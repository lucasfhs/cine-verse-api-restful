import { Router } from "express";
import {
  findOneComment,
  findAllComments,
  createOneComment,
  updateOneComment,
  deleteOneComment,
} from "../../controllers/content/comment";
import {
  findOneCommentValidation,
  commentCreateValidation,
  updateCommentValidation,
  deleteOneCommentValidation,
} from "../../middleware/validators/content/commentValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/comment", findAllComments);
router.get(
  "/comment/:id",
  findOneCommentValidation(),
  validate,
  findOneComment
);
router.post("/Comment", commentCreateValidation(), validate, createOneComment);
router.put(
  "/comment/:id",
  updateCommentValidation(),
  validate,
  updateOneComment
);
router.delete(
  "/comment/:id",
  deleteOneCommentValidation(),
  validate,
  deleteOneComment
);

export default router;
