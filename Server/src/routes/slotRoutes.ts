// src/routes/exploreRoutes.ts
import { Router } from "express";
import { getSlotById } from "../controllers/slotController.ts.js";
import { getSlotsByLessonId } from "../controllers/slotController.ts.js";
import { getLessonWithSlots } from "../controllers/slotController.ts.js";

const router = Router();

// GET api/lesson
router.get("/lesson/:lessonId", getLessonWithSlots);

//GET /api/slots?lessonId=X
router.get("/", getSlotsByLessonId);

// GET /api/slot/:id
router.get("/:id", getSlotById);

export default router;
