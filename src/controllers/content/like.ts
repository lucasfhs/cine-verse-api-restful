import { Request, Response } from "express";
import { LikeModel } from "../../models/content/Like";
import Logger from "../../config/logger";

export async function findAllLikes(req: Request, res: Response) {
  try {
    const likes = await LikeModel.find().lean();
    if (likes.length > 0) {
      res.status(200).json({
        success: true,
        count: likes.length,
        data: likes,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          Like: "No Likes found.",
        },
      });
    }
  } catch (error: any) {
    console.error(`Error on find Likes: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        Like: "Internal server error",
      },
    });
  }
}

export async function findOneLike(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const like = await LikeModel.findOne({ _id: id });
    if (like) {
      res.status(200).json({
        success: true,
        data: like,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          Like: "Like not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Like: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function updateOneLike(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { user_id, review_id } = req.body;
    const like = await LikeModel.findOneAndUpdate(
      { _id: id },
      {
        user_id,
        review_id,
      },
      { new: true }
    );
    if (like) {
      res.status(200).json({
        success: true,
        data: like,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Like not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Like: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneLike(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const like = await LikeModel.findOneAndDelete({ _id: id });
    if (like) {
      res.status(201).json({
        success: true,
        data: like,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Like not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete Like: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        Like: "Internal server error",
      },
    });
  }
}

export async function createOneLike(req: Request, res: Response) {
  try {
    const { user_id, review_id } = req.body;
    const newLike = await LikeModel.create({
      user_id,
      review_id,
    });

    res.status(201).json({
      success: true,
      data: newLike,
    });
  } catch (error: any) {
    Logger.error(`Error creating Like: ${error.Like}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          Like: "Error on creating Like.",
        },
      });
    } else {
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          Like: "Internal server error",
        },
      });
    }
  }
}
