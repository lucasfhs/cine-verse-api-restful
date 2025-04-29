import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "@/utils/tokenUtils";
import { UserModel } from "@/models/core/User";
import Logger from "@/config/logger";
import { TokenBlackList } from "@/utils/tokenBlackList";
import HttpStatusCode from "@/utils/httpStatusCode";
import { AccountModel } from "@/models/core/Account";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const account = await AccountModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!account || !(await bcrypt.compare(password, account.password))) {
      res
        .status(HttpStatusCode.NotAcceptable)
        .json({ message: "Invalid email/username or password" });
    } else {
      const accessToken = generateAccessToken(account._id.toString());
      const refreshToken = generateRefreshToken(account._id.toString());

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });

      res.json({ accessToken });
    }
  } catch (error) {
    Logger.error(`Error logging in ${error}`);
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "Error logging in" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const tokenBlackList = new TokenBlackList();
  if (!refreshToken) {
    res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: "Refresh Token is required." });
  }

  try {
    const isBlacklisted = await tokenBlackList.isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      res
        .status(HttpStatusCode.Forbidden)
        .json({ message: "Refresh token has been invalidated." });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    const expiresIn = decoded.exp
      ? Math.floor(decoded.exp - Date.now() / 1000)
      : 7 * 24 * 60 * 60;
    const accesstoken = req.header("Authorization")?.split(" ")[1];
    if (accesstoken) {
      await tokenBlackList.blacklistToken(accesstoken, expiresIn);
    }

    const newAccessToken = generateAccessToken(decoded.userId);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    Logger.error(`Error in refresh token: ${error}`);
    res
      .status(HttpStatusCode.Forbidden)
      .json({ message: "Invalid or expired refresh token." });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const tokenBlackList = new TokenBlackList();
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.header("Authorization")?.split(" ")[1];
    if (!refreshToken) {
      res
        .status(HttpStatusCode.BadRequest)
        .json({ message: "No refresh token provided." });
    }
    if (!accessToken) {
      res
        .status(HttpStatusCode.BadRequest)
        .json({ message: "No access token provided." });
    }

    const isBlacklisted = await tokenBlackList.isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      res.status(HttpStatusCode.BadRequest).json({
        message: "Account is already logged out or token is invalidated.",
      });
    } else {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as jwt.JwtPayload;
      console.log(decoded.exp);
      const expiresIn = decoded.exp
        ? Math.floor(decoded.exp - Date.now() / 1000)
        : 7 * 24 * 60 * 60;

      await tokenBlackList.blacklistToken(refreshToken!, expiresIn);
      await tokenBlackList.blacklistToken(accessToken!, expiresIn);
      res.clearCookie("refreshToken");
      res.json({ message: "Logged out successfully" });
    }
  } catch (error) {
    Logger.error(`Logout error: ${error}`);
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "Error during logout" });
  }
};
