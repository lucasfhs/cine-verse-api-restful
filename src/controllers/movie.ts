import { Request, Response } from "express";
import { MovieModel, MovieType } from "../models/Movie";

import Logger from "../config/logger";

export async function findOneMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;
    console.log(id);
    const movie = await MovieModel.findOne({ _id: id });
    if (movie) {
      res.status(200).json({
        success: true,
        data: movie,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Movie not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find movie: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

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
