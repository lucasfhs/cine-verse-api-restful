import { Router } from "express";
import { createMovie, findOneMovie } from "../../controllers/movie";
import {
  movieCreateValidation,
  findOneMovieValidation,
} from "../../middleware/movieValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.post("/movie", movieCreateValidation(), validate, createMovie);
router.get("/movie/:id", findOneMovieValidation(), validate, findOneMovie);
export default router;
