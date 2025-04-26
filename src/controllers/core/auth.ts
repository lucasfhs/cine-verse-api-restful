import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/tokenUtils";
import { UserModel } from "../../models/core/User";
import Logger from "../../config/logger";
import { TokenBlackList } from "../../utils/tokenBlackList";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      nickname,
      email,
      password,
      rePassword,
      role,
      avatar,
      phoneNumber,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name,
      nickname,
      email,
      password: hashedPassword,
      role,
      avatar,
      phoneNumber,
    });
    const newUserObject = newUser.toObject();

    const userWithoutPassword: Partial<typeof newUserObject> = {
      ...newUserObject,
    };
    delete userWithoutPassword.password;

    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error: any) {
    Logger.error(`Error creating user: ${error.message}`);

    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "Email must be unique",
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });

      res.json({ accessToken });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const tokenBlackList = new TokenBlackList();
  if (!refreshToken) {
    res.status(401).json({ message: "Refresh Token is required" });
  }

  try {
    const isBlacklisted = await tokenBlackList.isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      res.status(403).json({ message: "Refresh token has been invalidated" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    // Blacklista o token atual
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
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const tokenBlackList = new TokenBlackList();
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.header("Authorization")?.split(" ")[1];
    if (!refreshToken) {
      res.status(400).json({ message: "No refresh token provided" });
    }
    if (!accessToken) {
      res.status(400).json({ message: "No access token provided" });
    }

    const isBlacklisted = await tokenBlackList.isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      res.status(400).json({
        message: "User is already logged out or token is invalidated",
      });
    }

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
  } catch (error) {
    Logger.error(`Logout error: ${error}`);
    res.status(500).json({ message: "Error during logout" });
  }
};
