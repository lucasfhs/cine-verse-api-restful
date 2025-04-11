import { Request, Response } from "express";
import { ReviewModel } from "../../models/content/Review";
import Logger from "../../config/logger";
// user_id: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   movie_id: {
//     type: Schema.Types.ObjectId,
//     ref: "Movie",
//     required: true,
//   },
//   rating: { type: Number, min: 1, max: 5, required: true },
//   content: { type: String, required: true },
//   spoiler: { type: Boolean, default: false },

export async function findAllReviews(req: Request, res: Response) {
  try {
    const reviews = await ReviewModel.find().lean();
    if (reviews.length > 0) {
      res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          Review: "No Reviews found.",
        },
      });
    }
  } catch (error: any) {
    console.error(`Error on find Reviews: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        Review: "Internal server error",
      },
    });
  }
}

export async function findOneReview(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const review = await ReviewModel.findOne({ _id: id });
    if (review) {
      res.status(200).json({
        success: true,
        data: review,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Review not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Review: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}
export async function updateOneReview(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { user_id, movie_id, rating, content, spoiler } = req.body;
    const review = await ReviewModel.findOneAndUpdate(
      { _id: id },
      {
        user_id,
        movie_id,
        rating,
        content,
        spoiler,
      },
      { new: true }
    );
    if (review) {
      res.status(200).json({
        success: true,
        data: review,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Review not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Review: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneReview(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const Review = await ReviewModel.findOneAndDelete({ _id: id });
    if (Review) {
      res.status(201).json({
        success: true,
        data: Review,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Review not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete Review: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function createOneReview(req: Request, res: Response) {
  try {
    const { user_id, movie_id, rating, content, spoiler } = req.body;
    const newReview = await ReviewModel.create({
      user_id,
      movie_id,
      rating,
      content,
      spoiler,
    });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error: any) {
    Logger.error(`Error creating Review: ${error.Review}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Error on creating Review.",
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
