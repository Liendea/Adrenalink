import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

// POST
// http://localhost:3000/api/auth/register
router.post("/register", register);
// http://localhost:3000/api/auth/login
router.post("/login", login);

export default router;
