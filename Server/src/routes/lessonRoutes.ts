// src/routes/exploreRoutes.ts
import { Router } from "express";
import { getLessonWithSlots } from "../controllers/lessonController.ts.js";

const router = Router();

// GET api/lesson
router.get("/:lessonId", getLessonWithSlots);

export default router;
