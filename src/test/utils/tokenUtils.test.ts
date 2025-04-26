import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "@/utils/tokenUtils";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn() as jest.Mock,
}));

describe("Token Generation", () => {
  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET = "access_secret";
    process.env.ACCESS_TOKEN_EXPIRATION = "15m";
    process.env.REFRESH_TOKEN_SECRET = "refresh_secret";
    process.env.REFRESH_TOKEN_EXPIRATION = "7d";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate an access token with valid secret and expiration", () => {
    const userId = "user123";

    // Mock do jwt.sign
    (jwt.sign as jest.Mock).mockReturnValue("mocked_access_token");

    const accessToken = generateAccessToken(userId);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
    expect(accessToken).toBe("mocked_access_token");
  });

  it("should generate a refresh token with valid secret and expiration", () => {
    const userId = "user123";

    // Mock do jwt.sign
    (jwt.sign as jest.Mock).mockReturnValue("mocked_refresh_token");

    const refreshToken = generateRefreshToken(userId);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
    expect(refreshToken).toBe("mocked_refresh_token");
  });

  it("should throw an error if ACCESS_TOKEN_SECRET is not defined", () => {
    delete process.env.ACCESS_TOKEN_SECRET;

    expect(() => generateAccessToken("user123")).toThrow(
      "ACCESS_TOKEN_SECRET is not defined in environment variables"
    );
  });

  it("should throw an error if REFRESH_TOKEN_SECRET is not defined", () => {
    delete process.env.REFRESH_TOKEN_SECRET;

    expect(() => generateRefreshToken("user123")).toThrow(
      "REFRESH_TOKEN_SECRET is not defined in environment variables"
    );
  });
});
