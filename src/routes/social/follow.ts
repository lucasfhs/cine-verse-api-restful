import { Router } from "express";
import { followController } from "../../controllers/social/follow";
import {
  findOneFollowValidation,
  followCreateValidation,
  updateFollowValidation,
  deleteOneFollowValidation,
} from "../../middleware/validators/social/followValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/follow", followController.findAll);
router.get(
  "/follow/:id",
  findOneFollowValidation(),
  validate,
  followController.findOne
);
router.post(
  "/follow",
  followCreateValidation(),
  validate,
  followController.createOne
);
router.put(
  "/follow/:id",
  updateFollowValidation(),
  validate,
  followController.updateOne
);
router.delete(
  "/follow/:id",
  deleteOneFollowValidation(),
  validate,
  followController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Operações relacionadas a seguidores e seguidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do relacionamento
 *         follower_id:
 *           type: string
 *           description: ID do usuário que está seguindo (referência ao User)
 *         followed_id:
 *           type: string
 *           description: ID do usuário que está sendo seguido (referência ao User)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /follow:
 *   get:
 *     summary: Lista todos os relacionamentos de seguimento
 *     tags: [Follow]
 *     responses:
 *       200:
 *         description: Lista de follows retornada com sucesso
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
 *                     $ref: '#/components/schemas/Follow'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /follow/{id}:
 *   get:
 *     summary: Busca um follow específico por ID
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do relacionamento follow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follow encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Follow'
 *       404:
 *         description: Follow não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /follow:
 *   post:
 *     summary: Cria um novo relacionamento de follow
 *     tags: [Follow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - follower_id
 *               - followed_id
 *             type: object
 *             properties:
 *               follower_id:
 *                 type: string
 *               followed_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Follow criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Follow'
 *       409:
 *         description: O relacionamento já existe
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /follow/{id}:
 *   put:
 *     summary: Atualiza um relacionamento de follow existente
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do follow
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_id:
 *                 type: string
 *               followed_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Follow atualizado com sucesso
 *       404:
 *         description: Follow não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /follow/{id}:
 *   delete:
 *     summary: Remove um relacionamento de follow
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do follow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follow removido com sucesso
 *       404:
 *         description: Follow não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
