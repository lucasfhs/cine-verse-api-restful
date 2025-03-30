import { Router } from "express";
import { createMovie } from "../../controllers/movie";
import { movieCreateValidation } from "../../middleware/movieValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.post("/movie", movieCreateValidation(), validate, createMovie)
export default router;
