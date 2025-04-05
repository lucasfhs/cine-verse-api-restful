import { Request, Response } from "express";
import { MessageModel } from "../../models/social/Message";
import Logger from "../../config/logger";

export async function findAllMessages(req: Request, res: Response) {
  try {
    const messages: object[] = await MessageModel.find();
    if (messages.length > 0) {
      res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No Messages found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Messages: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function findOneMessage(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const message = await MessageModel.findOne({ _id: id });
    if (message) {
      res.status(200).json({
        success: true,
        data: message,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Message not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Message: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function updateOneMessage(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { sender_id, receiver_id, content } = req.body;
    const message = await MessageModel.findOneAndUpdate(
      { _id: id },
      {
        sender_id,
        receiver_id,
        content,
      },
      { new: true }
    );
    if (message) {
      res.status(200).json({
        success: true,
        data: message,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Message not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Message: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneMessage(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const Message = await MessageModel.findOneAndDelete({ _id: id });
    if (Message) {
      res.status(201).json({
        success: true,
        data: Message,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Message not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete Message: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function createOneMessage(req: Request, res: Response) {
  try {
    const { sender_id, receiver_id, content } = req.body;
    const newMessage = await MessageModel.create({
      sender_id,
      receiver_id,
      content,
    });
    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error: any) {
    Logger.error(`Error creating Message: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Messageer_id and Messageed_id  must be different",
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
