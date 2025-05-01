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
 *   description: Operations related to followers and following
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
 *           description: Unique ID of the relationship
 *         follower_id:
 *           type: string
 *           description: ID of the user who is following (reference to User)
 *         followed_id:
 *           type: string
 *           description: ID of the user being followed (reference to User)
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
 *     summary: List all follow relationships
 *     tags: [Follow]
 *     responses:
 *       200:
 *         description: List of follows returned successfully
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
 *         description: Internal server error
 */

/**
 * @swagger
 * /follow/{id}:
 *   get:
 *     summary: Get a specific follow relationship by ID
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Follow relationship ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follow found successfully
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
 *         description: Follow not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /follow:
 *   post:
 *     summary: Create a new follow relationship
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
 *         description: Follow created successfully
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
 *         description: Relationship already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /follow/{id}:
 *   put:
 *     summary: Update an existing follow relationship
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Follow ID
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
 *         description: Follow updated successfully
 *       404:
 *         description: Follow not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /follow/{id}:
 *   delete:
 *     summary: Delete a follow relationship
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Follow ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follow deleted successfully
 *       404:
 *         description: Follow not found
 *       500:
 *         description: Internal server error
 */
export default router;
