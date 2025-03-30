import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "common", "film critic"],
      required: true,
    },
    avatar: { type: String },
    phoneNumber: { type: Array },
  },
  {
    timestamps: true,
  }
);
export type UserType = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  rePassword?: string;
  role: "admin" | "common" | "film critic";
  avatar?: string;
  phoneNumber?: string[];
};

export const UserModel = model("User", userSchema);
