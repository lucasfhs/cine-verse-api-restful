import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
  },
  { timestamps: true }
);

export const MessageModel = model("Message", messageSchema);
