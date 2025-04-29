// controllers/BaseNoReturnCreateController.ts
import { Request, Response } from "express";
import { Model, Types } from "mongoose";
import HttpStatusCode from "@/utils/httpStatusCode";
import Logger from "@/config/logger";
import { BaseController } from "../BaseController";
import { AccountModel } from "@/models/core/Account";

// This class ensures that no user personal information is returned after creating the account in the registration route.

export class AccountController<T> extends BaseController<T> {
  constructor(model: Model<T>, name: string) {
    super(model, name);
  }

  override createOne = async (req: Request, res: Response) => {
    try {
      await this.model.create(req.body);
      res
        .status(HttpStatusCode.Created)
        .json({ success: true, message: `${this.name} created successfully.` });
    } catch (error: any) {
      Logger.error(`Error creating ${this.name}: ${error.message}`);
      if (error.name === "MongoServerError" && error.code === 11000) {
        res.status(HttpStatusCode.Conflict).json({
          success: false,
          error: {
            code: HttpStatusCode.Conflict,
            message: `${this.name} must be unique`,
          },
        });
      } else {
        res.status(HttpStatusCode.InternalServerError).json({
          success: false,
          error: {
            code: HttpStatusCode.InternalServerError,
            message: "Internal server error",
          },
        });
      }
    }
  };
}

export const accountController = new AccountController(AccountModel, "Account");
