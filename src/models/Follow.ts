import { model, Schema } from "mongoose";
const followSchema = new Schema({
  follower_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followed_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const FollowSchema = model("Follow", followSchema);
