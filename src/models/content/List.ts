/**
 * Module for defining the List model and schema using Mongoose.
 * @module ListModel
 */

import { model, Schema } from "mongoose";

/**
 * Mongoose schema definition for a List.
 * @typedef {Object} ListSchema
 * @property {Schema.Types.ObjectId} user_id - The ID of the user who owns the list. References the User model.
 * @property {string} [name] - The name of the list.
 * @property {string} [description] - The description of the list.
 * @property {Array<Schema.Types.ObjectId>} movies - Array of movie IDs referenced to the Movie model.
 * @property {Date} createdAt - Auto-generated timestamp when the list is created.
 * @property {Date} updatedAt - Auto-generated timestamp when the list is last updated.
 */
const listSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    description: String,
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

/**
 * Mongoose model for the List schema.
 * @type {Model<ListSchema>}
 */
export const ListModel = model("List", listSchema);
