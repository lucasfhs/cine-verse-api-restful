import { Types } from "mongoose";
export const isValidMongodbId = (value: string) => {
  if (!Types.ObjectId.isValid(value)) {
    throw new Error("Invalid MongoDB ObjectId.");
  }
  return true;
};
export const generateMongodbId = (): string => {
  return new Types.ObjectId().toHexString();
};
