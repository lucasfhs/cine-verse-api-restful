// test/utils/tokenBlacklist.test.ts
import { TokenBlackList } from "../../utils/tokenBlackList";

describe("TokenBlackList class", () => {
  const mockRedis = {
    set: jest.fn(),
    get: jest.fn(),
  };

  const blacklist = new TokenBlackList(mockRedis);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should blacklist a token", async () => {
    await blacklist.blacklistToken("abc123", 300);
    expect(mockRedis.set).toHaveBeenCalledWith(
      "blacklist:abc123",
      "true",
      "EX",
      300
    );
  });

  it("should return true if token is blacklisted", async () => {
    mockRedis.get.mockResolvedValue("true");
    const result = await blacklist.isTokenBlacklisted("abc123");
    expect(result).toBe(true);
  });

  it("should return false if token is not blacklisted", async () => {
    mockRedis.get.mockResolvedValue(null);
    const result = await blacklist.isTokenBlacklisted("abc123");
    expect(result).toBe(false);
  });
});
