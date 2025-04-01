import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Extended Express Request interface that includes an optional userId property.
 * This is used to attach the authenticated user's ID to the request object.
 */
interface RequestAuthenticate extends Request {
  userId?: string;
}

/**
 * Express middleware for authenticating requests using JWT tokens.
 *
 * This middleware checks for a valid JWT in the Authorization header,
 * verifies it, and attaches the user ID to the request object if valid.
 *
 * @param {RequestAuthenticate} req - The Express request object, extended to include userId
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next middleware function
 * @returns {void} If authentication fails, it returns a response with an error status.
 *                 If successful, it calls next() to continue to the next middleware.
 *
 * @example
 * // In your route setup:
 * app.get('/protected-route', authMiddleware, (req, res) => {
 *   // Only accessible with valid token
 *   res.send(`Hello user ${req.userId}`);
 * });
 */
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
