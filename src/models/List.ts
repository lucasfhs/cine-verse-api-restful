import { model, Schema } from "mongoose";
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
export const ListSchema = model("List", listSchema);
