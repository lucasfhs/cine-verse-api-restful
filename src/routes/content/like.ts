import { Router } from "express";

import { likeController } from "../../controllers/content/like";
import {
  findOneLikeValidation,
  likeCreateValidation,
  updateLikeValidation,
  deleteOneLikeValidation,
} from "../../middleware/validators/content/likeValidator";
import { validate } from "../../middleware/handleValidator";
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
 *   description: Operações relacionadas a Likes em reviews
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
 *     summary: Lista todos os Likes
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Likes
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
 *         description: Não autorizado, token JWT necessário
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /like/{id}:
 *   get:
 *     summary: Retorna um Like específico pelo ID
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
 *         description: Like encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       404:
 *         description: Like não encontrado
 *       401:
 *         description: Não autorizado, token JWT necessário
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Cria um novo Like
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
 *         description: Like criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado, token JWT necessário
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /like/{id}:
 *   put:
 *     summary: Atualiza um Like pelo ID
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
 *         description: Like atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: ID inválido ou dados da requisição mal formatados
 *       404:
 *         description: Like não encontrado
 *       401:
 *         description: Não autorizado, token JWT necessário
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /like/{id}:
 *   delete:
 *     summary: Deleta um Like pelo ID
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
 *         description: Like deletado com sucesso
 *       404:
 *         description: Like não encontrado
 *       401:
 *         description: Não autorizado, token JWT necessário
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
