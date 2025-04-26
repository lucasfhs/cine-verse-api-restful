import { model, Schema } from "mongoose";

const listSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

export const ListModel = model("List", listSchema);
