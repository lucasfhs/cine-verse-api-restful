import { Router } from "express";

import { likeController } from "@/controllers/content/like";
import {
  findOneLikeValidation,
  likeCreateValidation,
  updateLikeValidation,
  deleteOneLikeValidation,
} from "@/middleware/validators/content/likeValidator";
import { validate } from "@/middleware/handleValidator";
const router = Router();
router.get("/like", likeController.findAll);
router.get(
  "/like/:id",
  findOneLikeValidation(),
  validate,
  likeController.findOne
);
router.post(
  "/like",
  likeCreateValidation(),
  validate,
  likeController.createOne
);
router.put(
  "/like/:id",
  updateLikeValidation(),
  validate,
  likeController.updateOne
);
router.delete(
  "/like/:id",
  deleteOneLikeValidation(),
  validate,
  likeController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Operations related to Likes on reviews
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "61a2cda91f6b9d0743d83289"
 *         user_id:
 *           type: string
 *           example: "61a2cda91f6b9d0743d83288"
 *         review_id:
 *           type: string
 *           example: "61a2cda91f6b9d0743d83287"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /like:
 *   get:
 *     summary: List all Likes
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Likes
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
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Like'
 *       401:
 *         description: Unauthorized, JWT token required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /like/{id}:
 *   get:
 *     summary: Get a specific Like by ID
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       404:
 *         description: Like not found
 *       401:
 *         description: Unauthorized, JWT token required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Create a new Like
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - review_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "61a2cda91f6b9d0743d83288"
 *               review_id:
 *                 type: string
 *                 example: "61a2cda91f6b9d0743d83287"
 *     responses:
 *       201:
 *         description: Like created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized, JWT token required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /like/{id}:
 *   put:
 *     summary: Update a Like by ID
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 *     responses:
 *       200:
 *         description: Like updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Invalid ID or malformed request data
 *       404:
 *         description: Like not found
 *       401:
 *         description: Unauthorized, JWT token required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /like/{id}:
 *   delete:
 *     summary: Delete a Like by ID
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like deleted successfully
 *       404:
 *         description: Like not found
 *       401:
 *         description: Unauthorized, JWT token required
 *       500:
 *         description: Internal server error
 */

export default router;
