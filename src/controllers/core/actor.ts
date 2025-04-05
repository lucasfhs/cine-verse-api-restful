import { Request, Response } from "express";
import { ActorModel } from "../../models/core/Actor";
import Logger from "../../config/logger";
import { Types } from "mongoose";

export async function findAllActors(req: Request, res: Response) {
  try {
    const actors: object[] = await ActorModel.find();
    if (actors.length > 0) {
      res.status(200).json({
        success: true,
        count: actors.length,
        data: actors,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No Actors found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find actors: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function findOneActor(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const actor = await ActorModel.findOne({ _id: id });
    if (actor) {
      res.status(200).json({
        success: true,
        data: actor,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Actor not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Actor: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function updateOneActor(req: Request, res: Response) {
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
    const { name, birthdate, nationality } = req.body;
    const actor = await ActorModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        birthdate,
        nationality,
      },
      { new: true }
    );
    if (actor) {
      res.status(200).json({
        success: true,
        data: actor,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Actor not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find actor: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneActor(req: Request, res: Response) {
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
    const actor = await ActorModel.findOneAndDelete({ _id: id });
    if (actor) {
      res.status(201).json({
        success: true,
        data: actor,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Actor not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete Actor: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function createOneActor(req: Request, res: Response) {
  try {
    const { name, birthdate, nationality } = req.body;

    const newActor = await ActorModel.create({
      name,
      birthdate,
      nationality,
    });
    res.status(201).json({
      success: true,
      data: newActor,
    });
  } catch (error: any) {
    Logger.error(`Error creating Actor: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Actor title must be unique",
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
