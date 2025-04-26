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
