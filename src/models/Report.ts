import { model, Schema } from "mongoose";
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
    reason: String,
  },
  { timestamps: true }
);
export const ReportSchema = model("Report", reportSchema);
