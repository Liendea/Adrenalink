import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Hämtar en specifik tidsslot baserat på ID (URL-parameter)
 * GET /api/slots/:id
 */
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
