import { Request, Response } from "express";
import { FollowModel } from "../../models/social/Follow";
import Logger from "../../config/logger";

export async function findAllFollows(req: Request, res: Response) {
  try {
    const follows: object[] = await FollowModel.find();
    if (follows.length > 0) {
      res.status(200).json({
        success: true,
        count: follows.length,
        data: follows,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No Follows found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Follows: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function findOneFollow(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const follow = await FollowModel.findOne({ _id: id });
    if (follow) {
      res.status(200).json({
        success: true,
        data: follow,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Follow not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Follow: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function updateOneFollow(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { follower_id, followed_id } = req.body;
    const follow = await FollowModel.findOneAndUpdate(
      { _id: id },
      {
        follower_id,
        followed_id,
      },
      { new: true }
    );
    if (follow) {
      res.status(200).json({
        success: true,
        data: follow,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Follow not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Follow: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneFollow(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const follow = await FollowModel.findOneAndDelete({ _id: id });
    if (follow) {
      res.status(201).json({
        success: true,
        data: follow,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Follow not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete Follow: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function createOneFollow(req: Request, res: Response) {
  try {
    const { follower_id, followed_id } = req.body;
    const newFollow = await FollowModel.create({
      follower_id,
      followed_id,
    });
    res.status(201).json({
      success: true,
      data: newFollow,
    });
  } catch (error: any) {
    Logger.error(`Error creating Follow: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Follower_id and Followed_id  must be different",
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
