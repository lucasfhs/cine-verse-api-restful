import { Router } from "express";
import { createOneMovie, findOneMovie } from "../../controllers/core/movie";
import {
  movieCreateValidation,
  findOneMovieValidation,
} from "../../middleware/movieValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.post("/movie", movieCreateValidation(), validate, createOneMovie);
router.get("/movie/:id", findOneMovieValidation(), validate, findOneMovie);
export default router;
