// controllers/BaseController.ts
import { Request, Response } from "express";
import { Model, Types } from "mongoose";
import HttpStatusCode from "@/utils/httpStatusCode";
import Logger from "@/config/logger";

export class BaseController<T> {
  constructor(private model: Model<T>, private name: string) {}

  findAll = async (req: Request, res: Response) => {
    try {
      const docs = await this.model.find().lean();
      if (docs.length > 0) {
        res.status(HttpStatusCode.OK).json({
          success: true,
          count: docs.length,
          data: docs,
        });
      } else {
        res.status(HttpStatusCode.NotFound).json({
          success: false,
          error: {
            code: HttpStatusCode.NotFound,
            message: `No ${this.name}s found.`,
          },
        });
      }
    } catch (error: any) {
      Logger.error(`Error on find ${this.name}s: ${error.message}`);
      res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        error: {
          code: HttpStatusCode.InternalServerError,
          message: "Internal server error",
        },
      });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const doc = await this.model.findById(id);
      if (doc) {
        res.status(HttpStatusCode.OK).json({ success: true, data: doc });
      } else {
        res.status(HttpStatusCode.NotFound).json({
          success: false,
          error: {
            code: HttpStatusCode.NotFound,
            message: `${this.name} not found.`,
          },
        });
      }
    } catch (error: any) {
      Logger.error(`Error on find ${this.name}: ${error.message}`);
      res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        error: {
          code: HttpStatusCode.InternalServerError,
          message: "Internal server error",
        },
      });
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const doc = await this.model.create(req.body);
      res.status(HttpStatusCode.Created).json({ success: true, data: doc });
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

  updateOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        res.status(HttpStatusCode.BadRequest).json({
          success: false,
          error: {
            code: HttpStatusCode.BadRequest,
            message: "Invalid ID format",
          },
        });
      }

      const updated = await this.model.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (updated) {
        res.status(HttpStatusCode.OK).json({ success: true, data: updated });
      } else {
        res.status(HttpStatusCode.NotFound).json({
          success: false,
          error: {
            code: HttpStatusCode.NotFound,
            message: `${this.name} not found.`,
          },
        });
      }
    } catch (error: any) {
      Logger.error(`Error updating ${this.name}: ${error.message}`);
      res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        error: {
          code: HttpStatusCode.InternalServerError,
          message: "Internal server error",
        },
      });
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        res.status(HttpStatusCode.BadRequest).json({
          success: false,
          error: {
            code: HttpStatusCode.BadRequest,
            message: "Invalid ID format",
          },
        });
      }

      const deleted = await this.model.findByIdAndDelete(id);
      if (deleted) {
        res.status(HttpStatusCode.OK).json({ success: true, data: deleted });
      } else {
        res.status(HttpStatusCode.NotFound).json({
          success: false,
          error: {
            code: HttpStatusCode.NotFound,
            message: `${this.name} not found.`,
          },
        });
      }
    } catch (error: any) {
      Logger.error(`Error deleting ${this.name}: ${error.message}`);
      res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        error: {
          code: HttpStatusCode.InternalServerError,
          message: "Internal server error",
        },
      });
    }
  };
}
