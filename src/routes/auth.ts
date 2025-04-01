/**
 * Authentication routes module.
 * @module routes/auth
 * @requires express
 * @requires ../controllers/auth
 */

import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/core/auth";

/**
 * Express router for authentication routes
 */
const router = Router();

/**
 * Route for user registration
 * @name post/register
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Register controller
 */
router.post("/register", register);

/**
 * Route for user login
 * @name post/login
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Login controller
 */
router.post("/login", login);

/**
 * Route for refreshing access token
 * @name post/refresh-token
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - RefreshToken controller
 */
router.post("/refresh-token", refreshToken);

/**
 * Route for user logout
 * @name post/logout
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Logout controller
 */
router.post("/logout", logout);

export default router;
