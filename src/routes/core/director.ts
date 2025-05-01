import { Router } from "express";
import { directorController } from "@/controllers/core/director";
import {
  findOneDirectorValidation,
  directorCreateValidation,
  updateDirectorValidation,
  deleteOneDirectorValidation,
} from "@/middleware/validators/core/directorValidator";
import { validate } from "@/middleware/handleValidator";
const router = Router();
router.get("/director", directorController.findAll);
router.get(
  "/director/:id",
  findOneDirectorValidation(),
  validate,
  directorController.findOne
);
router.post(
  "/director",
  directorCreateValidation(),
  validate,
  directorController.createOne
);
router.put(
  "/director/:id",
  updateDirectorValidation(),
  validate,
  directorController.updateOne
);
router.delete(
  "/director/:id",
  deleteOneDirectorValidation(),
  validate,
  directorController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: Director
 *   description: Operations related to movie directors
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Director:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique director ID
 *         name:
 *           type: string
 *           description: Director's name
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         nationality:
 *           type: string
 *           description: Director's nationality
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /director:
 *   get:
 *     summary: List all directors
 *     tags: [Director]
 *     responses:
 *       200:
 *         description: List of directors
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Director'
 *       404:
 *         description: No directors found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /director/{id}:
 *   get:
 *     summary: Get a specific director by ID
 *     tags: [Director]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Director ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Director found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Director'
 *       404:
 *         description: Director not found
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /director:
 *   post:
 *     summary: Create a new director
 *     tags: [Director]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               nationality:
 *                 type: string
 *     responses:
 *       201:
 *         description: Director created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Director'
 *       400:
 *         description: Invalid data
 *       409:
 *         description: Duplicate director
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /director/{id}:
 *   put:
 *     summary: Update an existing director
 *     tags: [Director]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Director ID
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
 *               birthdate:
 *                 type: string
 *                 format: date
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Director updated successfully
 *       400:
 *         description: Invalid ID or invalid data
 *       404:
 *         description: Director not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /director/{id}:
 *   delete:
 *     summary: Delete a director
 *     tags: [Director]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Director ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Director deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Director not found
 *       500:
 *         description: Internal server error
 */
export default router;
