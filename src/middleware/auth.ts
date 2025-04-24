import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { isTokenBlacklisted, blacklistToken } from "../utils/tokenBlackList";
import Logger from "../config/logger";
import { asyncHandler } from "../utils/asyncHandler";

interface RequestAuthenticate extends Request {
  userId?: string;
}
interface RefreshRequest extends Request {
  userId?: string;
}

export const authMiddleware = asyncHandler(
  async (req: RequestAuthenticate, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Token is required" });
    }

    const blacklisted = await isTokenBlacklisted(token);
    if (blacklisted) {
      Logger.warn(`Attempt to use blacklisted token: ${token}`);
      return res.status(401).json({ message: "Token has been revoked" });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        userId: string;
      };

      req.userId = decoded.userId;
      next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }

      Logger.error(`Token verification error: ${err.message}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export const refreshAuthMiddleware = asyncHandler(
  async (req: RefreshRequest, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.header("Authorization")?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        message: "Access token is required for refresh. Please login again.",
      });
    }

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is required.",
      });
    }

    const isBlacklisted = await isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      return res.status(403).json({
        message: "Refresh token has been invalidated.",
      });
    }

    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    const decodedAccess = jwt.decode(accessToken) as jwt.JwtPayload | null;

    if (decodedAccess?.exp) {
      const expiresIn = Math.floor(decodedAccess.exp - Date.now() / 1000);
      if (expiresIn > 0) {
        await blacklistToken(accessToken, expiresIn);
      }
    }

    req.userId = decodedRefresh.userId;
    next();
  }
);
