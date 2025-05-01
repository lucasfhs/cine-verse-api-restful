import { Router } from "express";

import {
  findOneListValidation,
  listCreateValidation,
  updateListValidation,
  deleteOneListValidation,
} from "@/middleware/validators/content/listValidator";
import { validate } from "@/middleware/handleValidator";
import { listController } from "@/controllers/content/list";
const router = Router();
router.get("/list", listController.findAll);
router.get(
  "/list/:id",
  findOneListValidation(),
  validate,
  listController.findOne
);
router.post(
  "/list",
  listCreateValidation(),
  validate,
  listController.createOne
);
router.put(
  "/list/:id",
  updateListValidation(),
  validate,
  listController.updateOne
);
router.delete(
  "/list/:id",
  deleteOneListValidation(),
  validate,
  listController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: List
 *   description: Operations for managing lists
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier of the list
 *         name:
 *           type: string
 *           example: "Shopping List"
 *         description:
 *           type: string
 *           example: "A list of items to buy for the week."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: List creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date of last list update
 */

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Returns all lists
 *     tags: [List]
 *     responses:
 *       200:
 *         description: Returns an array of all lists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/List'
 *       404:
 *         description: No lists found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /list/{id}:
 *   get:
 *     summary: Returns a specific list by ID
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: List ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the list with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/List'
 *       404:
 *         description: List not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /list:
 *   post:
 *     summary: Creates a new list
 *     tags: [List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Shopping List"
 *               description:
 *                 type: string
 *                 example: "A list of items to buy for the week."
 *     responses:
 *       201:
 *         description: List created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/List'
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /list/{id}:
 *   put:
 *     summary: Updates an existing list by ID
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the list to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Shopping List"
 *               description:
 *                 type: string
 *                 example: "An updated list of items to buy for the week."
 *     responses:
 *       200:
 *         description: List updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/List'
 *       404:
 *         description: List not found
 *       400:
 *         description: Invalid ID format or invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /list/{id}:
 *   delete:
 *     summary: Deletes a list by ID
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the list to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List deleted successfully
 *       404:
 *         description: List not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */
export default router;
