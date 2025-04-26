import { Router } from "express";
import {
  findOneReviewValidation,
  reviewCreateValidation,
  updateReviewValidation,
  deleteOneReviewValidation,
} from "@/middleware/validators/content/reviewValidator";
import { validate } from "@/middleware/handleValidator";
import { reviewController } from "@/controllers/content/review";
const router = Router();
router.get("/review", reviewController.findAll);
router.get(
  "/review/:id",
  findOneReviewValidation(),
  validate,
  reviewController.findOne
);
router.post(
  "/review",
  reviewCreateValidation(),
  validate,
  reviewController.createOne
);
router.put(
  "/review/:id",
  updateReviewValidation(),
  validate,
  reviewController.updateOne
);
router.delete(
  "/review/:id",
  deleteOneReviewValidation(),
  validate,
  reviewController.deleteOne
);

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Operações para gerenciar revisões de filmes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador único da revisão
 *         user_id:
 *           type: string
 *           description: ID do usuário que fez a revisão (referencia o modelo User)
 *         movie_id:
 *           type: string
 *           description: ID do filme sendo revisado (referencia o modelo Movie)
 *         rating:
 *           type: integer
 *           description: Avaliação do filme (1-5 estrelas)
 *           example: 4
 *         content:
 *           type: string
 *           description: Texto da revisão
 *           example: "Filme muito bom, recomendo!"
 *         spoiler:
 *           type: boolean
 *           description: Flag indicando se a revisão contém spoilers
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da revisão
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização da revisão
 */

/**
 * @swagger
 * /review:
 *   get:
 *     summary: Retorna todas as revisões
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Retorna uma lista de todas as revisões
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
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: Nenhuma revisão encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     summary: Retorna uma revisão específica pelo ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da revisão
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna a revisão com o ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Revisão não encontrada
 *       400:
 *         description: Formato de ID inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Cria uma nova revisão
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID do usuário que está criando a revisão
 *               movie_id:
 *                 type: string
 *                 description: ID do filme sendo revisado
 *               rating:
 *                 type: integer
 *                 description: Avaliação dada ao filme (1-5)
 *               content:
 *                 type: string
 *                 description: Conteúdo da revisão
 *               spoiler:
 *                 type: boolean
 *                 description: Se a revisão contém spoilers
 *                 default: false
 *     responses:
 *       201:
 *         description: Revisão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /review/{id}:
 *   put:
 *     summary: Atualiza uma revisão existente pelo ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da revisão a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Avaliação atualizada (1-5)
 *               content:
 *                 type: string
 *                 description: Texto da revisão atualizada
 *               spoiler:
 *                 type: boolean
 *                 description: Se a revisão contém spoilers
 *     responses:
 *       200:
 *         description: Revisão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Revisão não encontrada
 *       400:
 *         description: Formato de ID inválido ou dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     summary: Deleta uma revisão pelo ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da revisão a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Revisão deletada com sucesso
 *       404:
 *         description: Revisão não encontrada
 *       400:
 *         description: Formato de ID inválido
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
