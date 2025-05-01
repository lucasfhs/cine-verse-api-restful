import { Router } from "express";
import { actorController } from "@/controllers/core/actor";
import {
  findOneActorValidation,
  actorCreateValidation,
  updateActorValidation,
  deleteOneActorValidation,
} from "@/middleware/validators/core/actorValidator";
import { validate } from "@/middleware/handleValidator";
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
 *   description: Operations related to actors
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
 *           description: Unique actor ID
 *         name:
 *           type: string
 *           description: Actor's name
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         nationality:
 *           type: string
 *           description: Actor's nationality
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
 *     summary: List all actors
 *     tags: [Actor]
 *     responses:
 *       200:
 *         description: List of actors
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
 *         description: No actors found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /actor/{id}:
 *   get:
 *     summary: Get a specific actor by ID
 *     tags: [Actor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Actor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actor found
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
 *         description: Actor not found
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /actor:
 *   post:
 *     summary: Create a new actor
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
 *         description: Actor created successfully
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
 *         description: Invalid data
 *       409:
 *         description: Duplicate actor
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /actor/{id}:
 *   put:
 *     summary: Update an existing actor
 *     tags: [Actor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Actor ID
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
 *         description: Actor updated
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /actor/{id}:
 *   delete:
 *     summary: Delete an actor
 *     tags: [Actor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Actor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actor deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error
 */
export default router;
