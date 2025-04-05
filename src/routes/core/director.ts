import { Router } from "express";
import {
  findOneDirector,
  findAllDirectors,
  createOneDirector,
  updateOneDirector,
  deleteOneDirector,
} from "../../controllers/core/director";
import {
  findOneDirectorValidation,
  directorCreateValidation,
  updateDirectorValidation,
  deleteOneDirectorValidation,
} from "../../middleware/validators/core/directorValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/director", findAllDirectors);
router.get(
  "/director/:id",
  findOneDirectorValidation(),
  validate,
  findOneDirector
);
router.post(
  "/director",
  directorCreateValidation(),
  validate,
  createOneDirector
);
router.put(
  "/director/:id",
  updateDirectorValidation(),
  validate,
  updateOneDirector
);
router.delete(
  "/director/:id",
  deleteOneDirectorValidation(),
  validate,
  deleteOneDirector
);

export default router;
