import { model, Schema } from "mongoose";

/**
 * Schema definition for follow relationships between users.
 * @typedef {Object} FollowSchema
 * @property {Schema.Types.ObjectId} follower_id - The ID of the user who is following (references User model).
 * @property {Schema.Types.ObjectId} followed_id - The ID of the user being followed (references User model).
 */
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
// Índice composto para garantir unicidade da relação
followSchema.index({ follower_id: 1, followed_id: 1 }, { unique: true });
/**
 * Mongoose model for Follow documents.
 * Represents a follow relationship where one user follows another.
 * @name Follow
 * @model
 * @type {Model<FollowModel>}
 */
export const FollowModel = model("Follow", followSchema);
