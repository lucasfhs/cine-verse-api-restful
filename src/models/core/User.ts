import mongoose, { Schema, model } from "mongoose";
import { AccountModel } from "./Account";

const addressSchema = new Schema(
  {
    street: { type: String },
    neighborhood: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    accountId: { type: mongoose.Types.ObjectId, ref: AccountModel },
    role: {
      type: String,
      enum: ["admin", "common", "film critic"],
      required: true,
    },
    avatar: { type: String },
    phoneNumbers: { type: [String] },
    address: addressSchema,
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", userSchema);
