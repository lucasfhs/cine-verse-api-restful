import { Request, Response } from "express";
import { ActorModel } from "../../models/core/Actor";
import Logger from "../../config/logger";
import { Types } from "mongoose";

export async function findAllXvariables(req: Request, res: Response) {
  try {
    const Xvariable = await XModel.find();
    if (Xvariable.length > 0) {
      res.status(200).json({
        success: true,
        data: Xvariable,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No Xvariables found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Xvariable: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function findOneXvariable(req: Request, res: Response) {
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
    const Xvariable = await XModel.findOne({ _id: id });
    if (Xvariable) {
      res.status(200).json({
        success: true,
        data: Xvariable,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Xvariable not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Xvariable: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function updateOneXvariable(req: Request, res: Response) {
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
    const Xvariable = await XModel.findOneAndUpdate(
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
    if (Xvariable) {
      res.status(200).json({
        success: true,
        data: Xvariable,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Xvariable not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Xvariable: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneXvariable(req: Request, res: Response) {
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
    const Xvariable = await XModel.findOneAndDelete({ _id: id });
    res.status(201).json({
      success: true,
      data: Xvariable,
    });
  } catch (error: any) {
    Logger.error(`Error creating Xvariable: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Xvariable title must be unique",
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

export async function createOneXvariable(req: Request, res: Response) {
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

    const newXvariable = await XModel.create({
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
      data: newXvariable,
    });
  } catch (error: any) {
    Logger.error(`Error creating Xvariable: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Xvariable title must be unique",
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
