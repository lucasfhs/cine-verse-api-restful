import {
  strongPasswordValidator,
  passwordFeedback,
  passwordCrackTime,
  validatePasswordStrength,
} from "../../utils/passwordValidator";

describe("Password Utils", () => {
  describe("strongPasswordValidator", () => {
    it("should return false for weak password", () => {
      const password = "123456";
      const result = strongPasswordValidator(password);
      expect(result).toBe(false);
    });

    it("should return true for strong password", () => {
      const password = "CorrectHorseBatteryStaple!";
      const result = strongPasswordValidator(password);
      expect(result).toBe(true);
    });
  });

  describe("passwordFeedback", () => {
    it("should return correct feedback for weak password", () => {
      const result = passwordFeedback("123456");
      expect(result.score).toBe(0);
      expect(result.suggestions[0]).toMatch(/Add another word or two/);
    });

    it("should return feedback for medium password", () => {
      const result = passwordFeedback("password123!");
      expect(result.score).toBeGreaterThanOrEqual(1);
      expect(result.suggestions.length).toBeGreaterThan(0);
    });

    it("should return no suggestions for strong password", () => {
      const result = passwordFeedback("CorrectHorseBatteryStaple!");
      expect(result.score).toBeGreaterThanOrEqual(3);
      expect(result.suggestions.length).toBe(0);
    });
  });

  describe("passwordCrackTime", () => {
    it("should return crack time for weak password", () => {
      const result = passwordCrackTime("123456");
      expect(result.timeDisplay.offline_fast_hashing_1e10_per_second).toMatch(
        /less than a second|instant/
      );
    });

    it("should return crack time for strong password", () => {
      const result = passwordCrackTime("CorrectHorseBatteryStaple!");
      expect(result.timeDisplay.online_throttling_100_per_hour).toMatch(
        /centuries|years|months/
      );
    });
  });

  describe("validatePasswordStrength", () => {
    it("should return feedback and warning for weak password", () => {
      const result = validatePasswordStrength("123456");
      expect(result.valid).toBe(false);
      expect(result.feedback[0]).toMatch(/Add another word or two/);
      expect(result.warning.length).toBeGreaterThan(0);
    });

    it("should return positive feedback for strong password", () => {
      const result = validatePasswordStrength("CorrectHorseBatteryStaple!");
      expect(result.valid).toBe(true);
      expect(result.feedback[0]).toMatch(/Strong password/);
      expect(result.warning).toBe("");
    });
  });
});
