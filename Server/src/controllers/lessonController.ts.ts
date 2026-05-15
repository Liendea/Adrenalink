import type { Request, Response } from "express";
import * as slotService from "../services/slotService.js";

// GET /api/lessons/:lessonId/slots
// Hämtar en lektion tillsammans med alla dess lediga tidsslots
export const getLessonWithSlots = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const lessonId = Number(req.params.lessonId);

  const lesson = await slotService.findLessonWithAvailableSlots(lessonId);
  if (!lesson) {
    res.status(404).json({ message: "Kunde inte hitta lektionen." });
    return;
  }

  res.json(lesson);
};
