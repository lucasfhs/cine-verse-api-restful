import { model, Schema } from "mongoose";

const accountSchema = new Schema(
  {
    username: { type: String, required: true, index: true },
    password: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    recoveryEmail: { type: String, unique: true },
    securityAnswer: { type: String, required: true },
  },
  { timestamps: true }
);

export const AccountModel = model("Account", accountSchema);
