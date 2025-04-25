import { NumberRangeValidator } from "../../utils/numberRange";
describe("NumberRangeValidator", () => {
  describe("inNumberRange", () => {
    it("should return true when the number is within the range", () => {
      // Arrange
      const validator = new NumberRangeValidator(10, 20);

      // Act
      const result = validator.inNumberRange(15);

      // Assert
      expect(result).toBe(true);
    });

    it("should return true when the number is exactly the min boundary", () => {
      const validator = new NumberRangeValidator(5, 10);
      expect(validator.inNumberRange(5)).toBe(true);
    });

    it("should return true when the number is exactly the max boundary", () => {
      const validator = new NumberRangeValidator(5, 10);
      expect(validator.inNumberRange(10)).toBe(true);
    });

    it("should throw an error when the number is below the minimum", () => {
      const validator = new NumberRangeValidator(5, 10);
      expect(() => validator.inNumberRange(3)).toThrow(
        "The number is not within the limits Min: 5 Max: 10"
      );
    });

    it("should throw an error when the number is above the maximum", () => {
      const validator = new NumberRangeValidator(5, 10);
      expect(() => validator.inNumberRange(12)).toThrow(
        "The number is not within the limits Min: 5 Max: 10"
      );
    });

    it("should coerce string numbers and still validate properly", () => {
      const validator = new NumberRangeValidator(1, 100);
      // @ts-ignore - forcing a string to simulate input
      expect(validator.inNumberRange("42")).toBe(true);
    });
  });
});
