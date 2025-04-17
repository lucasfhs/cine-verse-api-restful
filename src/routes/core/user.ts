import { Router } from "express";
import { userController } from "../../controllers/core/user";
import {
  findOneUserValidation,
  userCreateValidation,
  updateUserValidation,
  deleteOneUserValidation,
} from "../../middleware/validators/core/userValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/user", userController.findAll);
router.get(
  "/user/:id",
  findOneUserValidation(),
  validate,
  userController.findOne
);
router.post(
  "/user",
  userCreateValidation(),
  validate,
  userController.createOne
);
router.put(
  "/user/:id",
  updateUserValidation(),
  validate,
  userController.updateOne
);
router.delete(
  "/user/:id",
  deleteOneUserValidation(),
  validate,
  userController.deleteOne
);

export default router;
