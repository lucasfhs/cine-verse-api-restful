/**
 * Module for defining the Actor model using Mongoose.
 * @module models/actor
 */

import { model, Schema } from "mongoose";

/**
 * Mongoose schema definition for Actor.
 * @typedef {Object} ActorSchema
 * @property {string} name - The name of the actor (required).
 * @property {Date} [birthdate] - The birthdate of the actor.
 * @property {string} [nationality] - The nationality of the actor.
 * @property {Date} createdAt - Auto-generated timestamp when document is created.
 * @property {Date} updatedAt - Auto-generated timestamp when document is last updated.
 */
const actorSchema = new Schema(
  {
    name: { type: String, required: true },
    birthdate: Date,
    nationality: String,
  },
  { timestamps: true }
);

/**
 * Mongoose model for Actor based on actorSchema.
 * @type {Model<ActorSchema>}
 */
export const ActorModel = model("Actor", actorSchema);
