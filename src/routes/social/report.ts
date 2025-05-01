import { Router } from "express";
import { reportController } from "../../controllers/social/report";
import {
  findOneReportValidation,
  reportCreateValidation,
  updateReportValidation,
  deleteOneReportValidation,
} from "../../middleware/validators/social/reportValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/report", reportController.findAll);
router.get(
  "/report/:id",
  findOneReportValidation(),
  validate,
  reportController.findOne
);
router.post(
  "/report",
  reportCreateValidation(),
  validate,
  reportController.createOne
);
router.put(
  "/report/:id",
  updateReportValidation(),
  validate,
  reportController.updateOne
);
router.delete(
  "/report/:id",
  deleteOneReportValidation(),
  validate,
  reportController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: Report
 *   description: Operations related to review reports
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique ID of the report
 *         user_id:
 *           type: string
 *           description: ID of the user who made the report (reference to User model)
 *         review_id:
 *           type: string
 *           description: ID of the review being reported (reference to Review model)
 *         reason:
 *           type: string
 *           description: Reason for the report
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /report:
 *   get:
 *     summary: List all reports
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: List of reports returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/{id}:
 *   get:
 *     summary: Get a specific report by ID
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Report ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Report found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report:
 *   post:
 *     summary: Create a new report
 *     tags: [Report]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - user_id
 *               - review_id
 *               - reason
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               review_id:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       409:
 *         description: Error creating report (e.g., a report already exists for the same user-review pair)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/{id}:
 *   put:
 *     summary: Update an existing report
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Report ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               review_id:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Report updated successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/{id}:
 *   delete:
 *     summary: Delete a report
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Report ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */

export default router;
