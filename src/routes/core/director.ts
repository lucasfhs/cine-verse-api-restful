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
 *   description: Operações relacionadas a diretores de filmes
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
 *           description: ID único do diretor
 *         name:
 *           type: string
 *           description: Nome do diretor
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Data de nascimento
 *         nationality:
 *           type: string
 *           description: Nacionalidade do diretor
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
 *     summary: Lista todos os diretores
 *     tags: [Director]
 *     responses:
 *       200:
 *         description: Lista de diretores
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
 *         description: Nenhum diretor encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /director/{id}:
 *   get:
 *     summary: Retorna um diretor específico pelo ID
 *     tags: [Director]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do diretor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Diretor encontrado
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
 *         description: Diretor não encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /director:
 *   post:
 *     summary: Cria um novo diretor
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
 *         description: Diretor criado com sucesso
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
 *         description: Dados inválidos
 *       409:
 *         description: Diretor duplicado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /director/{id}:
 *   put:
 *     summary: Atualiza um diretor existente
 *     tags: [Director]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do diretor
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
 *         description: Diretor atualizado com sucesso
 *       400:
 *         description: ID inválido ou dados inválidos
 *       404:
 *         description: Diretor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /director/{id}:
 *   delete:
 *     summary: Remove um diretor
 *     tags: [Director]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do diretor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Diretor removido com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Diretor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
