import { Router } from "express";
import { movieController } from "../../controllers/core/movie";
import {
  movieCreateValidation,
  findOneMovieValidation,
} from "../../middleware/movieValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.post(
  "/movie",
  movieCreateValidation(),
  validate,
  movieController.findAll
);
router.get(
  "/movie/:id",
  findOneMovieValidation(),
  validate,
  movieController.findOne
);
export default router;
