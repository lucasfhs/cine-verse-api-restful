import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface RequestAuthenticate extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: RequestAuthenticate,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Token is required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
