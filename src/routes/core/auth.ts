import { Router } from "express";
import { login, refreshToken, logout } from "@/controllers/core/auth";
import { refreshAuthMiddleware } from "@/middleware/auth";
import { accountController } from "@/controllers/core/account";
import { validate } from "@/middleware/handleValidator";
import { accountCreateValidation } from "@/middleware/validators/core/accountValidator";
const router = Router();

router.post(
  "/register",
  accountCreateValidation(),
  validate,
  accountController.createOne
);

router.post("/login", login);

router.get("/refresh-token", refreshAuthMiddleware, refreshToken);

router.get("/logout", refreshAuthMiddleware, logout);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The account's username
 *         email:
 *           type: string
 *           format: email
 *           description: The account's email address
 *         password:
 *           type: string
 *           format: password
 *           description: The account's password (hashed)
 *     TokenResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT access token
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Logout status message
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *             message:
 *               type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - rePassword
 *               - email
 *               - securityAnswer
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique username for the account
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Must be at least 8 characters long, contain uppercase, lowercase, number and special character
 *                 example: "StrongPass123!"
 *               rePassword:
 *                 type: string
 *                 format: password
 *                 description: Must match the password field exactly
 *                 example: "StrongPass123!"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Valid email address
 *                 example: "john@example.com"
 *               recoveryEmail:
 *                 type: string
 *                 format: email
 *                 description: Optional recovery email address
 *                 example: "john.recovery@example.com"
 *               securityAnswer:
 *                 type: string
 *                 description: Answer for security question
 *                 example: "My first pet was Max"
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Account created successfully."
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *                   example:
 *                     - msg: "The password is not strong enough."
 *                       param: "password"
 *                       location: "body"
 *                     - msg: "Passwords do not match."
 *                       param: "rePassword"
 *                       location: "body"
 *       409:
 *         description: Conflict - Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with username/email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=abcde12345; Path=/; HttpOnly; Secure; SameSite=Strict
 *       406:
 *         description: Not Acceptable - Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /refresh-token:
 *   get:
 *     summary: Refresh access token using refresh token
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Unauthorized - Refresh token missing or invalid
 *       403:
 *         description: Forbidden - Refresh token blacklisted
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout user and invalidate tokens
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
 *       400:
 *         description: Bad Request - Missing tokens
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: refreshToken
 */
export default router;
