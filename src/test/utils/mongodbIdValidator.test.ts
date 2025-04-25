import { isValidMongodbId, generateMongodbId } from "../../utils/mongodbIdValidator"; // Ajuste o caminho correto
import { Types } from "mongoose";

describe("MongoDB ID Utilities", () => {
  describe("isValidMongodbId", () => {
    it("should return true for a valid MongoDB ObjectId", () => {
      const validId = new Types.ObjectId().toHexString();
      expect(isValidMongodbId(validId)).toBe(true);
    });

    it("should throw an error for an invalid MongoDB ObjectId", () => {
      expect(() => isValidMongodbId("invalid-id")).toThrow(
        "Invalid MongoDB ObjectId."
      );
      expect(() => isValidMongodbId("123")).toThrow(
        "Invalid MongoDB ObjectId."
      );
      expect(() => isValidMongodbId("")).toThrow("Invalid MongoDB ObjectId.");
    });
  });

  describe("generateMongodbId", () => {
    it("should generate a valid MongoDB ObjectId", () => {
      const generatedId = generateMongodbId();
      expect(Types.ObjectId.isValid(generatedId)).toBe(true);
    });

    it("should generate unique MongoDB ObjectIds", () => {
      const id1 = generateMongodbId();
      const id2 = generateMongodbId();
      expect(id1).not.toBe(id2);
    });
  });
});
