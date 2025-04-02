/**
 * Module for Review model definition using Mongoose.
 * @module models/review
 * @requires mongoose
 */

import { model, Schema } from "mongoose";

/**
 * Review schema definition.
 * @typedef {Object} ReviewSchema
 * @property {ObjectId} user_id - The ID of the user who created the review (references User model).
 * @property {ObjectId} movie_id - The ID of the movie being reviewed (references Movie model).
 * @property {number} rating - The rating given (1-5 stars).
 * @property {string} [content] - The review text content (optional).
 * @property {boolean} [spoiler=false] - Flag indicating if the review contains spoilers.
 * @property {Date} createdAt - Auto-generated creation date timestamp.
 * @property {Date} updatedAt - Auto-generated update date timestamp.
 */
const reviewSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie_id: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    content: String,
    spoiler: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/**
 * Mongoose model for Review documents.
 * @type {Model<ReviewSchema>}
 */
export const ReviewModel = model("Review", reviewSchema);
