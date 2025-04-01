/**
 * Module for defining the Message model and schema.
 * @module models/message
 */

import { model, Schema } from "mongoose";

/**
 * Represents a message schema in the database.
 * @typedef {Object} MessageSchema
 * @property {Schema.Types.ObjectId} sender_id - The ID of the user who sent the message. References the User model.
 * @property {Schema.Types.ObjectId} receiver_id - The ID of the user who received the message. References the User model.
 * @property {string} [content] - The content of the message.
 * @property {Date} createdAt - Timestamp when the message was created (automatically added by Mongoose).
 * @property {Date} updatedAt - Timestamp when the message was last updated (automatically added by Mongoose).
 */
const messageSchema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
  },
  { timestamps: true }
);

/**
 * Mongoose model for Message documents.
 * @type {Model<MessageSchema>}
 */
export const Message = model("Message", messageSchema);
