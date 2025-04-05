import { Router } from "express";
import {
  findOneMessage,
  findAllMessages,
  createOneMessage,
  updateOneMessage,
  deleteOneMessage,
} from "../../controllers/social/message";
import {
  findOneMessageValidation,
  messageCreateValidation,
  updateMessageValidation,
  deleteOneMessageValidation,
} from "../../middleware/validators/social/messageValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/message", findAllMessages);
router.get(
  "/message/:id",
  findOneMessageValidation(),
  validate,
  findOneMessage
);
router.post("/message", messageCreateValidation(), validate, createOneMessage);
router.put(
  "/message/:id",
  updateMessageValidation(),
  validate,
  updateOneMessage
);
router.delete(
  "/message/:id",
  deleteOneMessageValidation(),
  validate,
  deleteOneMessage
);

export default router;
