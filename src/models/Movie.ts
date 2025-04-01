import { model, Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: String,
    description: String,
    year: Number,
    genre: [String],
    average_rating: { type: Number, default: 0 },
    tmdb_id: String,
    actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
    directors: [{ type: Schema.Types.ObjectId, ref: "Director" }],
  },
  { timestamps: true }
);

export const MovieModel = model("Movie", movieSchema);
