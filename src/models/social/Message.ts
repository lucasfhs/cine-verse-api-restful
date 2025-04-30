import { model, Schema } from "mongoose";
import { encryptMessage, decryptMessage } from "@/utils/crypto";
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
    content: {
      type: String,
      required: true,
      get: (val: string) => decryptMessage(val),
      set: (val: string) => encryptMessage(val),
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: false,
    },
    toObject: {
      getters: true,
      virtuals: false,
    },
  }
);

export const MessageModel = model("Message", messageSchema);
