import { model, Schema } from "mongoose";

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
    content: { type: String, required: true },
    spoiler: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ReviewModel = model("Review", reviewSchema);
