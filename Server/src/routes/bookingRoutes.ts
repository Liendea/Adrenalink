import { Router } from "express";
import { authenticateToken } from "@/middleware/authMiddleware.js";
import { createBookingHandler } from "@/controllers/bookingController.js";

const router = Router();

router.post("/", authenticateToken, createBookingHandler);

export default router;
