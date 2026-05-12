import type { Request, Response } from "express";
import * as slotService from "../services/slotService.js";

// GET /api/lessons/:lessonId/slots
// Hämtar en lektion tillsammans med alla dess lediga tidsslots
export const getLessonWithSlots = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Plocka ut lessonId från URL:en och omvandla från sträng till nummer
  // t.ex. /api/lessons/2/slots → lessonId = 2
  const lessonId = Number(req.params.lessonId);

  // Validering — om ID inte är ett nummer, avvisa direkt
  if (isNaN(lessonId)) {
    res
      .status(400)
      .json({ message: "lessonId måste vara ett giltigt nummer." });
    return;
  }

  // Fråga service-lagret — returnerar lektionen med inbakade lediga tider
  const lesson = await slotService.findLessonWithAvailableSlots(lessonId);

  // Om lektionen inte finns i databasen — skicka 404 (Not Found)
  if (!lesson) {
    res.status(404).json({ message: "Kunde inte hitta lektionen." });
    return;
  }

  // Allt gick bra — skicka tillbaka lektionen med slottider som JSON
  res.json(lesson);
};
