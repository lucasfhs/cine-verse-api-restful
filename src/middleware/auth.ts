import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Logger from "@/config/logger";
import { asyncHandler } from "@/utils/asyncHandler";
import { TokenBlackList } from "@/utils/tokenBlackList";
import HttpStatusCode from "@/utils/httpStatusCode";
interface RequestAuthenticate extends Request {
  userId?: string;
}
interface RefreshRequest extends Request {
  userId?: string;
}

export const authMiddleware = asyncHandler(
  async (req: RequestAuthenticate, res: Response, next: NextFunction) => {
    const tokenBlackList = new TokenBlackList();
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ message: "Access Token is required" });
    }

    const blacklisted = await tokenBlackList.isTokenBlacklisted(token);
    if (blacklisted) {
      Logger.warn(`Attempt to use blacklisted token: ${token}`);
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ message: "Token has been revoked" });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        userId: string;
      };

      req.userId = decoded.userId;
      next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(HttpStatusCode.Unauthorized)
          .json({ message: "Access token expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res
          .status(HttpStatusCode.Unauthorized)
          .json({ message: "Invalid token" });
      }

      Logger.error(`Token verification error: ${err.message}`);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ message: "Internal server error" });
    }
  }
);

export const refreshAuthMiddleware = asyncHandler(
  async (req: RefreshRequest, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.header("Authorization")?.split(" ")[1];
    const tokenBlackList = new TokenBlackList();
    // if (!accessToken) {
    //   return res.status(HttpStatusCode.Unauthorized).json({
    //     message: "Access token is required for refresh. Please login again.",
    //   });
    // }

    if (!refreshToken) {
      return res.status(HttpStatusCode.Unauthorized).json({
        message: "Refresh token is required.",
      });
    }

    const isBlacklisted = await tokenBlackList.isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      return res.status(HttpStatusCode.Forbidden).json({
        message: "Refresh token has been invalidated.",
      });
    }

    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    const decodedAccess = jwt.decode(
      accessToken as any
    ) as jwt.JwtPayload | null;

    if (decodedAccess?.exp) {
      const expiresIn = Math.floor(decodedAccess.exp - Date.now() / 1000);
      if (expiresIn > 0) {
        await tokenBlackList.blacklistToken(accessToken as any, expiresIn);
      }
    }

    req.userId = decodedRefresh.userId;
    next();
  }
);
