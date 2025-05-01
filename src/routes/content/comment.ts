import { Router } from "express";
import { commentController } from "@/controllers/content/comment";
import {
  findOneCommentValidation,
  commentCreateValidation,
  updateCommentValidation,
  deleteOneCommentValidation,
} from "@/middleware/validators/content/commentValidator";
import { validate } from "@/middleware/handleValidator";

const router = Router();

router.get("/comment", commentController.findAll);
router.get(
  "/comment/:id",
  findOneCommentValidation(),
  validate,
  commentController.findOne
);
router.post(
  "/comment",
  commentCreateValidation(),
  validate,
  commentController.createOne
);
router.put(
  "/comment/:id",
  updateCommentValidation(),
  validate,
  commentController.updateOne
);
router.delete(
  "/comment/:id",
  deleteOneCommentValidation(),
  validate,
  commentController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment-related operations
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
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "661ef39fe0df482cd06b77f7"
 *         user_id:
 *           type: string
 *           example: "661ef39fe0df482cd06b77f8"
 *         review_id:
 *           type: string
 *           example: "661ef39fe0df482cd06b77f9"
 *         content:
 *           type: string
 *           example: "This is an encrypted comment"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: List all comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments
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
 *                     $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
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
 *         description: Comment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
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
 *               - content
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "661ef39fe0df482cd06b77f8"
 *               review_id:
 *                 type: string
 *                 example: "661ef39fe0df482cd06b77f9"
 *               content:
 *                 type: string
 *                 example: "This is the encrypted comment content"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Update an existing comment
 *     tags: [Comments]
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
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
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
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */

export default router;
