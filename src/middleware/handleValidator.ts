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
