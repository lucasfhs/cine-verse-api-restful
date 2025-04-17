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
import { refreshAuthMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token", refreshAuthMiddleware, refreshToken);

router.post("/logout", refreshAuthMiddleware, logout);

export default router;
