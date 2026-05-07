import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Hämtar en specifik tidsslot baserat på ID (URL-parameter)
// GET /api/slots/:id

export const getSlotById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // Kontrollera att ID faktiskt är ett nummer innan vi frågar databasen
    const slotId = Number(id);
    if (isNaN(slotId)) {
      res.status(400).json({ message: "ID måste vara ett giltigt nummer." });
      return;
    }

    // Hämta slotten och inkludera lektionsdetaljer
    const slot = await prisma.availableTime.findUnique({
      where: { id: slotId },
      include: {
        lesson: {
          include: {
            school: true,
          },
        },
      },
    });

    // Om slotten inte existerar i databasen
    if (!slot) {
      res.status(404).json({ message: "Kunde inte hitta den sökta tiden." });
      return;
    }

    // Skicka tillbaka den hittade slotten
    res.json(slot);
  } catch (error) {
    console.error("Fel i getSlotById controller:", error);
    res.status(500).json({ message: "Ett internt serverfel uppstod." });
  }
};

/**
 * Hämtar alla tidsslots för en specifik lektion
 * GET /api/slots?lessonId=X
 */
export const getSlotsByLessonId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const lessonId = Number(req.query.lessonId);

    if (isNaN(lessonId)) {
      res
        .status(400)
        .json({ message: "lessonId måste vara ett giltigt nummer." });
      return;
    }

    const slots = await prisma.availableTime.findMany({
      where: {
        lessonId,
        isBooked: false,
      },
      orderBy: { startTime: "asc" },
    });

    res.json(slots);
  } catch (error) {
    console.error("Fel i getSlotsByLessonId controller:", error);
    res.status(500).json({ message: "Ett internt serverfel uppstod." });
  }
};

// Hämta lektioner med slot tider
export const getLessonWithSlots = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const lessonId = Number(req.params.lessonId);

    if (isNaN(lessonId)) {
      res
        .status(400)
        .json({ message: "lessonId måste vara ett giltigt nummer." });
      return;
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        school: true,
        availableTimes: {
          where: { isBooked: false },
          orderBy: { startTime: "asc" },
        },
      },
    });

    if (!lesson) {
      res.status(404).json({ message: "Kunde inte hitta lektionen." });
      return;
    }

    res.json(lesson);
  } catch (error) {
    console.error("Fel i getLessonWithSlots:", error);
    res.status(500).json({ message: "Ett internt serverfel uppstod." });
  }
};
