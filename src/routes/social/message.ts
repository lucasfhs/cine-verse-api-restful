import { Router } from "express";
import { messageController } from "../../controllers/social/message";
import {
  findOneMessageValidation,
  messageCreateValidation,
  updateMessageValidation,
  deleteOneMessageValidation,
} from "../../middleware/validators/social/messageValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/message", messageController.findAll);
router.get(
  "/message/:id",
  findOneMessageValidation(),
  validate,
  messageController.findOne
);
router.post(
  "/message",
  messageCreateValidation(),
  validate,
  messageController.createOne
);
router.put(
  "/message/:id",
  updateMessageValidation(),
  validate,
  messageController.updateOne
);
router.delete(
  "/message/:id",
  deleteOneMessageValidation(),
  validate,
  messageController.deleteOne
);
/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Operações relacionadas a mensagens entre usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único da mensagem
 *         sender_id:
 *           type: string
 *           description: ID do remetente (referência ao User)
 *         receiver_id:
 *           type: string
 *           description: ID do destinatário (referência ao User)
 *         content:
 *           type: string
 *           description: Conteúdo descriptografado da mensagem
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da mensagem
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização da mensagem
 */

/**
 * @swagger
 * /message:
 *   get:
 *     summary: Lista todas as mensagens
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: Lista de mensagens retornada com sucesso
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
 *                     $ref: '#/components/schemas/Message'
 *       404:
 *         description: Nenhuma mensagem encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /message/{id}:
 *   get:
 *     summary: Busca uma mensagem pelo ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da mensagem
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensagem encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       404:
 *         description: Mensagem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Cria uma nova mensagem
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - sender_id
 *               - receiver_id
 *               - content
 *             type: object
 *             properties:
 *               sender_id:
 *                 type: string
 *               receiver_id:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       409:
 *         description: Remetente e destinatário devem ser diferentes
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /message/{id}:
 *   put:
 *     summary: Atualiza uma mensagem existente
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da mensagem
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_id:
 *                 type: string
 *               receiver_id:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensagem atualizada com sucesso
 *       404:
 *         description: Mensagem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /message/{id}:
 *   delete:
 *     summary: Remove uma mensagem pelo ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da mensagem
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensagem removida com sucesso
 *       404:
 *         description: Mensagem não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
