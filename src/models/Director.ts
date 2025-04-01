import { model, Schema } from "mongoose";
const directorSchema = new Schema(
  {
    name: { type: String, required: true },
    birthdate: Date,
    nationality: String,
  },
  { timestamps: true }
);
export const DirectorSchema = model("Director", directorSchema);
