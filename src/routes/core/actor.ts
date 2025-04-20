import { Router } from "express";
import { actorController } from "../../controllers/core/actor";
import {
  findOneActorValidation,
  actorCreateValidation,
  updateActorValidation,
  deleteOneActorValidation,
} from "../../middleware/validators/core/actorValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/actor", actorController.findAll);
router.get(
  "/actor/:id",
  findOneActorValidation(),
  validate,
  actorController.findOne
);
router.post(
  "/actor",
  actorCreateValidation(),
  validate,
  actorController.createOne
);
router.put(
  "/actor/:id",
  updateActorValidation(),
  validate,
  actorController.updateOne
);
router.delete(
  "/actor/:id",
  deleteOneActorValidation(),
  validate,
  actorController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: Actor
 *   description: Operações relacionadas aos atores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do ator
 *         name:
 *           type: string
 *           description: Nome do ator
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Data de nascimento
 *         nationality:
 *           type: string
 *           description: Nacionalidade do ator
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /actor:
 *   get:
 *     summary: Lista todos os atores
 *     tags: [Actor]
 *     responses:
 *       200:
 *         description: Lista de atores
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
 *                     $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Nenhum ator encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /actor/{id}:
 *   get:
 *     summary: Obtém um ator específico pelo ID
 *     tags: [Actor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ator
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ator encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Ator não encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /actor:
 *   post:
 *     summary: Cria um novo ator
 *     tags: [Actor]
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
 *       201:
 *         description: Ator criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Ator duplicado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /actor/{id}:
 *   put:
 *     summary: Atualiza um ator existente
 *     tags: [Actor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ator
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
 *         description: Ator atualizado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Ator não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /actor/{id}:
 *   delete:
 *     summary: Deleta um ator
 *     tags: [Actor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ator
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ator deletado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Ator não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
