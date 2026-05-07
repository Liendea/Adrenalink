// src/routes/exploreRoutes.ts
import { Router } from "express";
import { getSlotById } from "../controllers/slotController.ts.js";

const router = Router();

// GET /api/slot/:id
router.get("/:id", getSlotById);

export default router;
