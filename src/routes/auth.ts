import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/core/auth";
import { refreshAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token", refreshAuthMiddleware, refreshToken);

router.post("/logout", refreshAuthMiddleware, logout);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operações de autenticação de usuários
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
 *     Auth:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: Token de acesso gerado após login ou refresh
 *         refreshToken:
 *           type: string
 *           description: Token de atualização usado para renovar o token de acesso
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               nickname:
 *                 type: string
 *                 example: "johnd"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               rePassword:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 example: "common"
 *               avatar:
 *                 type: string
 *                 example: "http://example.com/avatar.jpg"
 *               phoneNumber:
 *                 type: string
 *                 example: "+123456789"
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
 *                   example: true
 *                 data:
 *                   type: object
 *                   additionalProperties: true
 *       409:
 *         description: Conflito, e-mail já registrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário e gera os tokens de acesso
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token de acesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Token de acesso gerado após login
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro no processo de login
 */

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Gera um novo token de acesso a partir de um refresh token válido
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Novo token de acesso gerado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Novo token de acesso
 *       401:
 *         description: Refresh token inválido ou expirado
 *       403:
 *         description: Refresh token foi invalidado
 *       500:
 *         description: Erro ao gerar novo token de acesso
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Realiza logout do usuário, invalidando os tokens de acesso e refresh
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout bem-sucedido, tokens invalidados
 *       400:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro ao realizar o logout
 */

export default router;
