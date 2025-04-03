import { model, Schema } from "mongoose";

/**
 * Mongoose schema for User entity
 * @type {Schema}
 */
const userSchema = new Schema(
  {
    name: { type: String, require: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    /** User's hashed password */
    password: { type: String, required: true },
    /**
     * User's role in the system
     * @enum {string} Possible values: "admin", "common", "film critic"
     */
    role: {
      type: String,
      enum: ["admin", "common", "film critic"],
      required: true,
    },
    /** URL to user's avatar image */
    avatar: { type: String },
    /** Array of user's phone numbers */
    phoneNumber: { type: Array },
  },
  {
    timestamps: true,
  }
);

/**
 * Type definition for User entity
 * @typedef {Object} UserType
 * @property {string} name - User's full name
 * @property {string} nickname - User's display nickname
 * @property {string} email - User's email address
 * @property {string} password - User's hashed password
 * @property {string} [rePassword] - Only used for password confirmation during registration
 * @property {"admin"|"common"|"film critic"} role - User's role in the system
 * @property {string} [avatar] - URL to user's avatar image
 * @property {string[]} [phoneNumber] - Array of user's phone numbers
 */
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

/**
 * Mongoose Model for User entity
 * @constant {Model<UserType>}
 */
export const UserModel = model("User", userSchema);
