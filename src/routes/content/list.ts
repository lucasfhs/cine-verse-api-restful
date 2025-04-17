import { Router } from "express";

import {
  findOneListValidation,
  listCreateValidation,
  updateListValidation,
  deleteOneListValidation,
} from "../../middleware/validators/content/listValidator";
import { validate } from "../../middleware/handleValidator";
import { listController } from "../../controllers/content/list";
const router = Router();
router.get("/list", listController.findAll);
router.get(
  "/list/:id",
  findOneListValidation(),
  validate,
  listController.findOne
);
router.post(
  "/list",
  listCreateValidation(),
  validate,
  listController.createOne
);
router.put(
  "/list/:id",
  updateListValidation(),
  validate,
  listController.updateOne
);
router.delete(
  "/list/:id",
  deleteOneListValidation(),
  validate,
  listController.deleteOne
);

export default router;
