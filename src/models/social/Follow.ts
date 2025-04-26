import { model, Schema } from "mongoose";

const followSchema = new Schema(
  {
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
  },
  { timestamps: true }
);
// Composite index to ensure uniqueness of the relationship
followSchema.index({ follower_id: 1, followed_id: 1 }, { unique: true });

export const FollowModel = model("Follow", followSchema);
