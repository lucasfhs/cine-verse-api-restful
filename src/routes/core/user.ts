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
 *   description: User management operations
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
 *           description: Unique user ID
 *         name:
 *           type: string
 *           description: User's full name (automatically capitalized)
 *         role:
 *           type: string
 *           enum: [admin, common, film critic]
 *           description: User's role in the system
 *         accountId:
 *           type: string
 *           description: Reference to the associated Account
 *         avatar:
 *           type: string
 *           format: url
 *           description: URL of the user's avatar image
 *         phoneNumbers:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user's phone numbers
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             neighborhood:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             postalCode:
 *               type: string
 *             country:
 *               type: string
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
 *     summary: List all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
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
 *         description: No users found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Valid MongoDB ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
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
 *         description: Invalid ID format
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - accountId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               role:
 *                 type: string
 *                 enum: [admin, common, film critic]
 *                 example: "common"
 *               accountId:
 *                 type: string
 *                 description: Valid MongoDB ID of the associated account
 *                 example: "507f191e810c19729de860ea"
 *               avatar:
 *                 type: string
 *                 format: url
 *                 example: "https://example.com/avatar.jpg"
 *               phoneNumbers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["+5511999999999"]
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "123 Main St"
 *                   neighborhood:
 *                     type: string
 *                     example: "Downtown"
 *                   city:
 *                     type: string
 *                     example: "São Paulo"
 *                   state:
 *                     type: string
 *                     example: "SP"
 *                   postalCode:
 *                     type: string
 *                     example: "01001000"
 *                   country:
 *                     type: string
 *                     example: "Brazil"
 *     responses:
 *       201:
 *         description: User created successfully
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
 *         description: Validation error (invalid role, missing required fields, etc.)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Valid MongoDB ID of the user to update
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
 *                 example: "Jane Doe"
 *               role:
 *                 type: string
 *                 enum: [admin, common, film critic]
 *                 example: "film critic"
 *               avatar:
 *                 type: string
 *                 format: url
 *                 example: "https://example.com/new-avatar.jpg"
 *               phoneNumbers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["+5511888888888", "+5511999999999"]
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   neighborhood:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Valid MongoDB ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

export default router;
