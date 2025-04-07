import { Router } from "express";
import {
  findOneReport,
  findAllReports,
  createOneReport,
  updateOneReport,
  deleteOneReport,
} from "../../controllers/social/report";
import {
  findOneReportValidation,
  reportCreateValidation,
  updateReportValidation,
  deleteOneReportValidation,
} from "../../middleware/validators/social/reportValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/report", findAllReports);
router.get("/report/:id", findOneReportValidation(), validate, findOneReport);
router.post("/report", reportCreateValidation(), validate, createOneReport);
router.put("/report/:id", updateReportValidation(), validate, updateOneReport);
router.delete(
  "/report/:id",
  deleteOneReportValidation(),
  validate,
  deleteOneReport
);

export default router;
