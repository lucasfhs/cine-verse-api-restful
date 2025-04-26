import { Router } from "express";
import {
  findOneComment,
  findAllComments,
  createOneComment,
  updateOneComment,
  deleteOneComment,
} from "@/controllers/content/comment";
import {
  findOneCommentValidation,
  commentCreateValidation,
  updateCommentValidation,
  deleteOneCommentValidation,
} from "@/middleware/validators/content/commentValidator";
import { validate } from "@/middleware/handleValidator";

const router = Router();

router.get("/comment", findAllComments);
router.get(
  "/comment/:id",
  findOneCommentValidation(),
  validate,
  findOneComment
);
router.post("/comment", commentCreateValidation(), validate, createOneComment);
router.put(
  "/comment/:id",
  updateCommentValidation(),
  validate,
  updateOneComment
);
router.delete(
  "/comment/:id",
  deleteOneCommentValidation(),
  validate,
  deleteOneComment
);
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Operações relacionadas a comentários
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
 *           example: "Esse é um comentário criptografado"
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
 *     summary: Lista todos os comentários
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comentários
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
 *     summary: Retorna um comentário por ID
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
 *         description: Comentário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentário não encontrado
 */

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Cria um novo comentário
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
 *                 example: "Este é o conteúdo criptografado do comentário"
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Atualiza um comentário existente
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
 *         description: Comentário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentário não encontrado
 */

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Remove um comentário
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
 *         description: Comentário deletado com sucesso
 *       404:
 *         description: Comentário não encontrado
 */

export default router;
