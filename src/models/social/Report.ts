import { model, Schema } from "mongoose";
import { encryptMessage, decryptMessage } from "@/utils/crypto";
const reportSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review_id: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
    reason: {
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

export const ReportModel = model("Report", reportSchema);
