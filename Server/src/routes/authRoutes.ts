import { Router } from "express";
import {
  register,
  login,
  updateProfileImage,
  updateProfile,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// POST
// http://localhost:3000/api/auth/register
router.post("/register", register);
// http://localhost:3000/api/auth/login
router.post("/login", login);

// http://localhost:3000/api/auth/login
router.patch("/profile-image", updateProfileImage);
// http://localhost:3000/api/auth/login
router.patch("/profile", authenticateToken, updateProfile);

export default router;
