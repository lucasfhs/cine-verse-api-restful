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
 *   description: Operações para gerenciar listas
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
 *           description: Identificador único da lista
 *         name:
 *           type: string
 *           example: "Shopping List"
 *         description:
 *           type: string
 *           example: "A list of items to buy for the week."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da lista
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização da lista
 */

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Retorna todas as listas
 *     tags: [List]
 *     responses:
 *       200:
 *         description: Retorna uma lista de todas as listas
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
 *         description: Nenhuma lista encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /list/{id}:
 *   get:
 *     summary: Retorna uma lista específica pelo ID
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da lista
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna a lista com o ID especificado
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
 *         description: Lista não encontrada
 *       400:
 *         description: Formato de ID inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /list:
 *   post:
 *     summary: Cria uma nova lista
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
 *         description: Lista criada com sucesso
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
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /list/{id}:
 *   put:
 *     summary: Atualiza uma lista existente pelo ID
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da lista a ser atualizada
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
 *         description: Lista atualizada com sucesso
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
 *         description: Lista não encontrada
 *       400:
 *         description: Formato de ID inválido ou dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /list/{id}:
 *   delete:
 *     summary: Deleta uma lista pelo ID
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da lista a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista deletada com sucesso
 *       404:
 *         description: Lista não encontrada
 *       400:
 *         description: Formato de ID inválido
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
