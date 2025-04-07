/**
 * Comment Mongoose Model
 *
 * Represents a comment in the system, associated with a review and a user.
 *
 * @typedef {Object} Comment
 * @property {Schema.Types.ObjectId} review_id - The ID of the review this comment belongs to (references Review model)
 * @property {Schema.Types.ObjectId} user_id - The ID of the user who created the comment (references User model)
 * @property {string} [content] - The content/text of the comment
 * @property {Date} createdAt - Automatically added timestamp when comment is created
 * @property {Date} updatedAt - Automatically added timestamp when comment is updated
 *
 * @module models/Comment
 * @requires mongoose
 */
import { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    review_id: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = model("Comment", commentSchema);
