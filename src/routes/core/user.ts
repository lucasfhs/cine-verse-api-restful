import { Router } from "express";
import { userController } from "@/controllers/core/user";
import {
  findOneUserValidation,
  userCreateValidation,
  updateUserValidation,
  deleteOneUserValidation,
} from "@/middleware/validators/core/userValidator";
import { validate } from "@/middleware/handleValidator";
const router = Router();
router.get("/user", userController.findAll);
router.get(
  "/user/:id",
  findOneUserValidation(),
  validate,
  userController.findOne
);
router.post(
  "/user",
  userCreateValidation(),
  validate,
  userController.createOne
);
router.put(
  "/user/:id",
  updateUserValidation(),
  validate,
  userController.updateOne
);
router.delete(
  "/user/:id",
  deleteOneUserValidation(),
  validate,
  userController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do usuário
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *         nickname:
 *           type: string
 *           description: Apelido ou nome de exibição
 *         email:
 *           type: string
 *           format: email
 *           description: Endereço de email do usuário
 *         password:
 *           type: string
 *           format: password
 *           description: Senha (hash)
 *         role:
 *           type: string
 *           enum: [admin, common, film critic]
 *           description: Papel do usuário no sistema
 *         avatar:
 *           type: string
 *           description: URL da imagem de avatar
 *         phoneNumber:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de telefones do usuário
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
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
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: Nenhum usuário encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nickname
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               nickname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               rePassword:
 *                 type: string
 *                 description: Confirmação de senha
 *               role:
 *                 type: string
 *                 enum: [admin, common, film critic]
 *               avatar:
 *                 type: string
 *               phoneNumber:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Usuário já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
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
 *               nickname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, common, film critic]
 *               avatar:
 *                 type: string
 *               phoneNumber:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
