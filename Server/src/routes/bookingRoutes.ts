import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createBookingHandler,
  getMyBookingsHandler,
} from "../controllers/bookingController.js";

const router = Router();

router.post("/bookings", authenticateToken, createBookingHandler);
router.get("/profile/bookings", authenticateToken, getMyBookingsHandler);

export default router;
