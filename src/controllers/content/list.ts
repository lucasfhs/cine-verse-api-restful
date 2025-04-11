import { Request, Response } from "express";
import { ListModel } from "../../models/content/List";
import Logger from "../../config/logger";

export async function findAllLists(req: Request, res: Response) {
  try {
    const lists = await ListModel.find().lean();
    if (lists.length > 0) {
      res.status(200).json({
        success: true,
        count: lists.length,
        data: lists,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No Lists found.",
        },
      });
    }
  } catch (error: any) {
    console.error(`Error on find Lists: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function findOneList(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const list = await ListModel.findOne({ _id: id });
    if (list) {
      res.status(200).json({
        success: true,
        data: list,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "List not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find List: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}
export async function updateOneList(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { user_id, name, description, movies } = req.body;
    const list = await ListModel.findOneAndUpdate(
      { _id: id },
      {
        user_id,
        name,
        description,
        movies,
      },
      { new: true }
    );
    if (list) {
      res.status(200).json({
        success: true,
        data: list,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "List not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find List: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneList(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const List = await ListModel.findOneAndDelete({ _id: id });
    if (List) {
      res.status(201).json({
        success: true,
        data: List,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "List not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete List: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function createOneList(req: Request, res: Response) {
  try {
    const { user_id, name, description, movies } = req.body;
    const newList = await ListModel.create({
      user_id,
      name,
      description,
      movies,
    });

    res.status(201).json({
      success: true,
      data: newList,
    });
  } catch (error: any) {
    Logger.error(`Error creating List: ${error.List}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Error on creating List.",
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
