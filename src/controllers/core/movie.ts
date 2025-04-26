// controllers/MovieController.ts
import { MovieModel } from "@/models/core/Movie";
import { BaseController } from "../BaseController";

export const movieController = new BaseController(MovieModel, "Movie");
