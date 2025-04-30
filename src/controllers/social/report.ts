// controllers/ReportController.ts
import { ReportModel } from "../../models/social/Report";
import { BaseController } from "../BaseController";

export const reportController = new BaseController(ReportModel, "Report");
