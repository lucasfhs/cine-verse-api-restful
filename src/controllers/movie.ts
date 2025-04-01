import { Request, Response } from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../config/logger";
import { Types } from "mongoose";

/**
 * Retrieves all movies from the database
 * @async
 * @function findAllMovies
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} Returns a JSON response with all movies or an error message
 */
export async function findAllMovies(req: Request, res: Response) {
  try {
    const movie = await MovieModel.find();
    if (movie.length > 0) {
      res.status(200).json({
        success: true,
        data: movie,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No movies found.",
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

/**
 * Retrieves a single movie by its ID
 * @async
 * @function findOneMovie
 * @param {Request} req - Express request object with movie ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} Returns a JSON response with the movie or an error message
 */
export async function findOneMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Invalid ID format",
        },
      });
    }
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

/**
 * Updates a movie by its ID
 * @async
 * @function updateOneMovie
 * @param {Request} req - Express request object with movie ID in params and updated data in body
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} Returns a JSON response with the updated movie or an error message
 */
export async function updateOneMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Invalid ID format",
        },
      });
    }
    const {
      title,
      description,
      year,
      genre,
      average_rating,
      tmdb_id,
      actors,
      directors,
    } = req.body;
    const movie = await MovieModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        year,
        genre,
        average_rating,
        tmdb_id,
        actors,
        directors,
      },
      { new: true }
    );
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

/**
 * Deletes a movie by its ID
 * @async
 * @function deleteOneMovie
 * @param {Request} req - Express request object with movie ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} Returns a JSON response with the deleted movie or an error message
 */
export async function deleteOneMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Invalid ID format",
        },
      });
    }
    const movie = await MovieModel.findOneAndDelete({ _id: id });
    res.status(201).json({
      success: true,
      data: movie,
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

/**
 * Creates a new movie
 * @async
 * @function createOneMovie
 * @param {Request} req - Express request object with movie data in body
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} Returns a JSON response with the created movie or an error message
 */
export async function createOneMovie(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      year,
      genre,
      average_rating,
      tmdb_id,
      actors,
      directors,
    } = req.body;

    const newMovie = await MovieModel.create({
      title,
      description,
      year,
      genre,
      average_rating,
      tmdb_id,
      actors,
      directors,
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
