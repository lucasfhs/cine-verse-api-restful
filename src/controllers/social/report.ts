import { Request, Response } from "express";
import { ReportModel } from "../../models/social/Report";
import { encryptMessage, decryptMessage } from "../../utils/crypto";
import Logger from "../../config/logger";


export async function findAllReports(req: Request, res: Response) {
  try {
    const reports = await ReportModel.find().lean();

    if (reports.length > 0) {
      const decryptedReports = reports.map((msg) => ({
        ...msg,
        reason: msg.reason ? decryptMessage(msg.reason) : null,
      }));

      res.status(200).json({
        success: true,
        count: decryptedReports.length,
        data: decryptedReports,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          Report: "No Reports found.",
        },
      });
    }
  } catch (error: any) {
    console.error(`Error on find Reports: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        Report: "Internal server error",
      },
    });
  }
}

export async function findOneReport(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const report = await ReportModel.findOne({ _id: id });
    if (report) {
      const decryptedContent = decryptMessage(report.reason!);
      report.reason = decryptedContent;
      res.status(200).json({
        success: true,
        data: report,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          Report: "Report not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Report: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        Report: "Internal server error",
      },
    });
  }
}

export async function updateOneReport(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { user_id, review_id, reason } = req.body;
    const cryptoContent = encryptMessage(reason);
    const report = await ReportModel.findOneAndUpdate(
      { _id: id },
      {
        user_id,
        review_id,
        reason: cryptoContent,
      },
      { new: true }
    );
    if (report) {
      res.status(200).json({
        success: true,
        data: report,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          Report: "Report not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Report: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        Report: "Internal server error",
      },
    });
  }
}

export async function deleteOneReport(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const report = await ReportModel.findOneAndDelete({ _id: id });
    if (report) {
      res.status(201).json({
        success: true,
        data: report,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          Report: "Report not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete Report: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        Report: "Internal server error",
      },
    });
  }
}

export async function createOneReport(req: Request, res: Response) {
  try {
    const { user_id, review_id, reason } = req.body;
    const cryptoContent = encryptMessage(reason);
    const newReport = await ReportModel.create({
      user_id,
      review_id,
      reason: cryptoContent,
    });

    res.status(201).json({
      success: true,
      data: newReport,
    });
  } catch (error: any) {
    Logger.error(`Error creating Report: ${error.Report}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          Report: "Error on creating report.",
        },
      });
    } else {
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          Report: "Internal server error",
        },
      });
    }
  }
}
