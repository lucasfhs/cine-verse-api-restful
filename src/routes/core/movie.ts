import { Router } from "express";
import { movieController } from "../../controllers/core/movie";
import {
  movieCreateValidation,
  findOneMovieValidation,
  updateMovieValidation,
  deleteOneMovieValidation,
} from "../../middleware/validators/core/movieValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.post(
  "/movie",
  movieCreateValidation(),
  validate,
  movieController.createOne
);
router.get("/movie", validate, movieController.findAll);

router.get(
  "/movie/:id",
  findOneMovieValidation(),
  validate,
  movieController.findOne
);
router.put(
  "/movie/:id",
  updateMovieValidation(),
  validate,
  movieController.updateOne
);

router.delete(
  "/movie/:id",
  deleteOneMovieValidation(),
  validate,
  movieController.deleteOne
);
export default router;
