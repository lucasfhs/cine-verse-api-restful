import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const accountSchema = new Schema(
  {
    username: { type: String, required: true, index: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    recoveryEmail: { type: String, required: true, unique: true },
    securityAnswer: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
accountSchema.pre("save", async function (next) {
  const account = this as any; // you can type better if you have a proper interface

  if (!account.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = 10;
    account.password = await bcrypt.hash(account.password, saltRounds);
    next();
  } catch (error) {
    next(error as any);
  }
});

export const AccountModel = model("Account", accountSchema);
