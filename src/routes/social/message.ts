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
 *   description: Operations related to messages between users
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
 *           description: Unique message ID
 *         sender_id:
 *           type: string
 *           description: Sender ID (reference to User)
 *         receiver_id:
 *           type: string
 *           description: Recipient ID (reference to User)
 *         content:
 *           type: string
 *           description: Decrypted message content
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Message creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Message last update date
 */

/**
 * @swagger
 * /message:
 *   get:
 *     summary: List all messages
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: Message list retrieved successfully
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
 *         description: No messages found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /message/{id}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Message ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message retrieved successfully
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
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Create a new message
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
 *         description: Message created successfully
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
 *         description: Sender and recipient must be different
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /message/{id}:
 *   put:
 *     summary: Update an existing message
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Message ID
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
 *         description: Message updated successfully
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /message/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Message ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */
export default router;
