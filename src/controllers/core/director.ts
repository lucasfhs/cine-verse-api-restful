import { Request, Response } from "express";
import { DirectorModel } from "../../models/core/Director";
import Logger from "../../config/logger";

export async function findAllDirectors(req: Request, res: Response) {
  try {
    const directors: object[] = await DirectorModel.find();
    if (directors.length > 0) {
      res.status(200).json({
        success: true,
        count: directors.length,
        data: directors,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No Directors found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Directors: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function findOneDirector(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const director = await DirectorModel.findOne({ _id: id });
    if (director) {
      res.status(200).json({
        success: true,
        data: director,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Director not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Director: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function updateOneDirector(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { name, birthdate, nationality } = req.body;
    const director = await DirectorModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        birthdate,
        nationality,
      },
      { new: true }
    );
    if (director) {
      res.status(200).json({
        success: true,
        data: director,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Director not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Director: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneDirector(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const director = await DirectorModel.findOneAndDelete({ _id: id });
    if (director) {
      res.status(201).json({
        success: true,
        data: director,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Director not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete Director: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function createOneDirector(req: Request, res: Response) {
  try {
    const { name, birthdate, nationality } = req.body;
    const newDirector = await DirectorModel.create({
      name,
      birthdate,
      nationality,
    });
    res.status(201).json({
      success: true,
      data: newDirector,
    });
  } catch (error: any) {
    Logger.error(`Error creating Director: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Director email must be unique",
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
