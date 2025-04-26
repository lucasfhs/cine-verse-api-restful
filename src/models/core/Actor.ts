import { model, Schema } from "mongoose";

const actorSchema = new Schema(
  {
    name: { type: String, required: true },
    birthdate: Date,
    nationality: String,
  },
  { timestamps: true }
);

export const ActorModel = model("Actor", actorSchema);
