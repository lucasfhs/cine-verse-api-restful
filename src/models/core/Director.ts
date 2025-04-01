/**
 * Module for Director's model definition and schema.
 * @module models/director
 * @requires mongoose
 */

import { model, Schema } from "mongoose";

/**
 * Mongoose schema definition for Director.
 * @typedef {Object} DirectorSchema
 * @property {string} name - The name of the director (required).
 * @property {Date} [birthdate] - The birthdate of the director.
 * @property {string} [nationality] - The nationality of the director.
 * @property {Date} createdAt - Auto-generated timestamp of document creation.
 * @property {Date} updatedAt - Auto-generated timestamp of document update.
 */
const directorSchema = new Schema(
  {
    name: { type: String, required: true },
    birthdate: Date,
    nationality: String,
  },
  { timestamps: true }
);

/**
 * Mongoose model for Director documents.
 * @type {Model<DirectorSchema>}
 */
export const Director = model("Director", directorSchema);
