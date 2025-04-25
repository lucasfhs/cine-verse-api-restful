import validateDifferentFrom from "../../utils/ensureDifferentIds";
import { generateMongodbId } from "../../utils/mongodbIdValidator";

describe("validateDifferentFrom util", () => {
  it("should throw an error when the fields are equal", () => {
    const id = generateMongodbId();

    const fakeRequest = {
      req: {
        body: {
          id: id,
        },
      },
    };

    const validator = validateDifferentFrom("id");

    expect(() =>
      validator(id, fakeRequest as any).toThrow(
        `${"id"} must be different from ${id}`
      )
    );
  });

  it("should return true when the fields are different", () => {
    const id1 = generateMongodbId();
    const id2 = generateMongodbId();

    const fakeRequest = {
      req: {
        body: {
          id: id1,
        },
      },
    };

    const validator = validateDifferentFrom("id");

    const result = validator(id2, fakeRequest as any);

    expect(result).toBe(true);
  });
});
