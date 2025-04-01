/**
 * Module defining the Report model for MongoDB using Mongoose.
 * @module ReportModel
 */

import { model, Schema } from "mongoose";

/**
 * Mongoose schema definition for Report documents.
 * @constant {Schema}
 */
const reportSchema = new Schema(
  {
    /**
     * Reference to the User who created the report.
     * @type {Schema.Types.ObjectId}
     * @ref {User}
     * @required
     */
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /**
     * Reference to the Review being reported.
     * @type {Schema.Types.ObjectId}
     * @ref {Review}
     * @required
     */
    review_id: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },

    /**
     * Reason for the report.
     * @type {String}
     */
    reason: String,
  },
  { timestamps: true }
);

/**
 * Mongoose model for Report documents.
 * @constant {Model}
 * @exports ReportSchema
 */
export const ReportSchema = model("Report", reportSchema);
