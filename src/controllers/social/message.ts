// controllers/MessageController.ts
import { MessageModel } from "../../models/social/Message";
import { BaseController } from "../BaseController";

export const messageController = new BaseController(MessageModel, "Message");
