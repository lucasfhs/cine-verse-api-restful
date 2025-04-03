import { Router } from "express";
import {
  findOneUser,
  findAllUsers,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} from "../../controllers/core/user";
import {
  findOneUserValidation,
  userCreateValidation,
  updateUserValidation,
  deleteOneUserValidation,
} from "../../middleware/validators/core/userValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/user", findAllUsers);
router.get("/user/:id", findOneUserValidation(), validate, findOneUser);
router.post("/user", userCreateValidation(), validate, createOneUser);
router.put("/user/:id", updateUserValidation(), validate, updateOneUser);
router.delete("/user/:id", deleteOneUserValidation(), validate, deleteOneUser);

export default router;
