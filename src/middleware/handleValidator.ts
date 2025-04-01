/**
 * Middleware function to validate request data using express-validator
 * @module validate
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {void} Either passes control to the next middleware or returns a 422 response with validation errors
 */
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  const formattedErrors = errors.mapped();
  res.status(422).json({ success: false, code: 422, errors: formattedErrors });

  return;
};
