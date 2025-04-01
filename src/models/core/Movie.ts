import { model, Schema } from "mongoose";

/**
 * Mongoose schema for Movie model
 * @typedef {Object} MovieSchema
 * @property {string} title - The title of the movie
 * @property {string} description - The description of the movie
 * @property {number} year - The release year of the movie
 * @property {string[]} genre - Array of genres the movie belongs to
 * @property {number} average_rating - The average rating of the movie (default: 0)
 * @property {string} tmdb_id - The ID from The Movie Database (TMDb)
 * @property {Array<Schema.Types.ObjectId>} actors - Array of actor references (ref: 'Actor')
 * @property {Array<Schema.Types.ObjectId>} directors - Array of director references (ref: 'Director')
 * @property {Date} createdAt - Auto-generated creation date (from timestamps)
 * @property {Date} updatedAt - Auto-generated update date (from timestamps)
 */
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

/**
 * Mongoose model for Movie documents
 * @typedef {Model<MovieSchema>} MovieModel
 */
export const MovieModel = model("Movie", movieSchema);
