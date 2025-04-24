import { blacklistToken, isTokenBlacklisted } from "../../utils/tokenBlacklist";
import redis from "../../config/redis";

jest.mock("../../config/redis", () => {
  const mockData = new Map();

  return {
    __mockData: mockData,
    default: {
      getInstance: () => ({
        set: jest.fn((key, value, _mode, expiresInSeconds) => {
          mockData.set(key, value);
          // Simulate expiration with a timeout (optional)
          if (expiresInSeconds > 0) {
            setTimeout(() => mockData.delete(key), expiresInSeconds * 1000);
          }
        }),
        get: jest.fn((key) => mockData.get(key) ?? null),
      }),
    },
  };
});

describe("Token Blacklist Utils", () => {
  const token = "mocked-jwt-token";

  it("should store token in blacklist", async () => {
    await blacklistToken(token, 10);

    const isBlacklisted = await isTokenBlacklisted(token);
    expect(isBlacklisted).toBe(true);
  });

  it("should return false for token not in blacklist", async () => {
    const isBlacklisted = await isTokenBlacklisted("some-other-token");
    expect(isBlacklisted).toBe(false);
  });
});
