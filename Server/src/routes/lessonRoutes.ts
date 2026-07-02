import { Router } from "express";
import { getLessonWithSlots } from "../controllers/lessonController.ts.js";
import { validateParamId } from "../middleware/validateParamId.js";

const router = Router();

// GET api/lessons/:lessonId/slots
router.get("/:lessonId/slots", validateParamId("lessonId"), getLessonWithSlots);

export default router;
