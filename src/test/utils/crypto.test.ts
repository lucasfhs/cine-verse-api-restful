import { encryptMessage, decryptMessage } from "../../utils/crypto";

describe("Crypto Utils", () => {
  const mockSecretKey = "12345678901234567890123456789012"; // 32 chars

  beforeAll(() => {
    process.env.MESSAGE_SECRET_KEY = mockSecretKey;
  });

  it("should encrypt and decrypt the message correctly", () => {
    const message = "Hello, secure world!";
    const encrypted = encryptMessage(message);
    const decrypted = decryptMessage(encrypted);

    expect(encrypted).toContain(":");
    expect(decrypted).toBe(message);
  });

  it("should throw an error if MESSAGE_SECRET_KEY is invalid", () => {
    process.env.MESSAGE_SECRET_KEY = "short-key";

    expect(() => encryptMessage("hello")).toThrow(
      "MESSAGE_SECRET_KEY must be defined and be 32 characters long"
    );
  });
});
