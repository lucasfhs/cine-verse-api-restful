import { Router } from "express";
import { directorController } from "../../controllers/core/director";
import {
  findOneDirectorValidation,
  directorCreateValidation,
  updateDirectorValidation,
  deleteOneDirectorValidation,
} from "../../middleware/validators/core/directorValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/director", directorController.findAll);
router.get(
  "/director/:id",
  findOneDirectorValidation(),
  validate,
  directorController.findOne
);
router.post(
  "/director",
  directorCreateValidation(),
  validate,
  directorController.createOne
);
router.put(
  "/director/:id",
  updateDirectorValidation(),
  validate,
  directorController.updateOne
);
router.delete(
  "/director/:id",
  deleteOneDirectorValidation(),
  validate,
  directorController.deleteOne
);

export default router;
