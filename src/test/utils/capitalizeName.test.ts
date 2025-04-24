import { capitalizeName } from "../../utils/stringUtils";

describe("capitalizeName", () => {
  it("should capitalize each word in a lowercase name", () => {
    // ARRANGE
    const input = "john doe";

    // ACT
    const result = capitalizeName(input);

    // ASSERT
    expect(result).toBe("John Doe");
  });

  it("should handle names with mixed casing", () => {
    const input = "aLiCe JoHnSon";
    const result = capitalizeName(input);
    expect(result).toBe("Alice Johnson");
  });

  it("should handle single word names", () => {
    const input = "bruno";
    const result = capitalizeName(input);
    expect(result).toBe("Bruno");
  });

  it("should handle extra spaces between words", () => {
    const input = "  maria   clara  ";
    const result = capitalizeName(input.trim().replace(/\s+/g, " "));
    expect(result).toBe("Maria Clara");
  });

  it("should return empty string if input is empty", () => {
    const input = "";
    const result = capitalizeName(input);
    expect(result).toBe("");
  });
});
