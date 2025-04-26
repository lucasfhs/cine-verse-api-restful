import { Request, Response } from "express";
import { CommentModel } from "@/models/content/Comment";
import { encryptMessage, decryptMessage } from "@/utils/crypto";
import Logger from "@/config/logger";

export async function findAllComments(req: Request, res: Response) {
  try {
    const comments = await CommentModel.find().lean();

    if (comments.length > 0) {
      const decryptedComments = comments.map((msg) => ({
        ...msg,
        content: msg.content ? decryptMessage(msg.content) : null,
      }));

      res.status(200).json({
        success: true,
        count: decryptedComments.length,
        data: decryptedComments,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No Comments found.",
        },
      });
    }
  } catch (error: any) {
    console.error(`Error on find Comments: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function findOneComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const comment = await CommentModel.findOne({ _id: id });
    if (comment) {
      const decryptedContent = decryptMessage(comment.content!);
      comment.content = decryptedContent;
      res.status(200).json({
        success: true,
        data: comment,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Comment not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Comment: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function updateOneComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { user_id, review_id, content } = req.body;
    const cryptoContent = encryptMessage(content);
    const comment = await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        user_id,
        review_id,
        content: cryptoContent,
      },
      { new: true }
    );
    if (comment) {
      res.status(200).json({
        success: true,
        data: comment,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Comment not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Comment: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneComment(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const comment = await CommentModel.findOneAndDelete({ _id: id });
    if (comment) {
      res.status(200).json({
        success: true,
        data: comment,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Comment not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete Comment: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function createOneComment(req: Request, res: Response) {
  try {
    const { user_id, review_id, content } = req.body;
    const cryptoContent = encryptMessage(content);
    const newComment = await CommentModel.create({
      user_id,
      review_id,
      content: cryptoContent,
    });

    res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (error: any) {
    Logger.error(`Error creating Comment: ${error.Comment}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Error on creating Comment.",
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
