import type { Request, Response } from "express";
import { prisma } from "../config/db.js";

// GET /api/favorites – hämta alla favoriter för inloggad användare
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        lesson: {
          include: { school: true },
        },
        school: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ favorites });
  } catch (error) {
    console.error("Fel i getFavorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/favorites – lägg till favorit
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { lessonId, schoolId } = req.body as {
      lessonId?: number;
      schoolId?: number;
    };

    if (!lessonId && !schoolId) {
      res.status(400).json({ message: "lessonId eller schoolId krävs." });
      return;
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        lessonId: lessonId ?? null,
        schoolId: schoolId ?? null,
      },
    });

    res.status(201).json({ favorite });
  } catch (error) {
    console.error("Fel i addFavorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/favorites/:id – ta bort favorit
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "id krävs." });
      return;
    }

    const favoriteId = parseInt(String(id));

    if (isNaN(favoriteId)) {
      res.status(400).json({ message: "id måste vara ett nummer." });
      return;
    }

    // Kontrollera att favoriten tillhör användaren
    const favorite = await prisma.favorite.findUnique({
      where: { id: favoriteId },
    });

    if (!favorite || favorite.userId !== userId) {
      res.status(404).json({ message: "Favorit hittades inte." });
      return;
    }

    await prisma.favorite.delete({ where: { id: favoriteId } });
    res.json({ message: "Favorit borttagen." });
  } catch (error) {
    console.error("Fel i removeFavorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};
