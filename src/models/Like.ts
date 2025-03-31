import { model, Schema } from "mongoose";
const likeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review_id: {
    type: Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
});
export const LikeSchema = model("Like", likeSchema);
