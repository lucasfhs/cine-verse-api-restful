import { model, Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: { type: String, require: true, index: true, unique: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    director: { type: String, required: true },
    stars: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    poster: { type: String },
    actors: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);
export type MovieType = {
  title: string;
  rating: number;
  description: string;
  director: string;
  stars: 1 | 2 | 3 | 4 | 5;
  poster?: string;
  actors: string[];
};

export const MovieModel = model("Movie", movieSchema);
