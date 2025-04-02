import { model, Schema } from "mongoose";

/**
 * Schema representing a like on a review.
 * @typedef {Object} LikeSchema
 * @property {Schema.Types.ObjectId} user_id - The ID of the user who liked the review (references User model).
 * @property {Schema.Types.ObjectId} review_id - The ID of the review that was liked (references Review model).
 */
const likeSchema = new Schema({
  /**
   * The user who created the like
   * @type {Schema.Types.ObjectId}
   * @ref {User}
   * @required
   */
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  /**
   * The review that was liked
   * @type {Schema.Types.ObjectId}
   * @ref {Review}
   * @required
   */
  review_id: {
    type: Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
});

/**
 * Mongoose model for Like documents.
 * @class Like
 * @extends mongoose.Model
 */
export const LikeModel = model("Like", likeSchema);
