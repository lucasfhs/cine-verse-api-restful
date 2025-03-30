import { Request, Response } from "express";
import { MovieModel, MovieType } from "../models/Movie";

import Logger from "../config/logger";

export async function createMovie(req: Request, res: Response) {
  try {
    const {
      title,
      rating,
      description,
      director,
      stars,
      poster,
      actors,
    }: MovieType = req.body;

    const newMovie = await MovieModel.create({
      title,
      rating,
      description,
      director,
      stars,
      poster,
      actors,
    });
    res.status(201).json({
      success: true,
      data: newMovie,
    });
  } catch (error: any) {
    Logger.error(`Error creating movie: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Movie title must be unique",
        },
      });
    } else {
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: "Internal server error",
        },
      });
    }
  }
}
