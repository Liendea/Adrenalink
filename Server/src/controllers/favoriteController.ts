import type { Request, Response } from "express";
import * as favoriteService from "../services/favoriteService.js";

// GET /api/favorites — hämta alla favoriter för inloggad användare
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const favorites = await favoriteService.findFavoritesByUserId(userId);
    res.json({ favorites });
  } catch (error) {
    console.error("Fel i getFavorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/favorites — lägg till favorit
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

    const favorite = await favoriteService.createFavorite(
      userId,
      lessonId,
      schoolId,
    );
    res.status(201).json({ favorite });
  } catch (error) {
    console.error("Fel i addFavorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/favorites/:id — ta bort favorit
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const favoriteId = parseInt(String(req.params.id)); // middleware garanterar giltigt nummer

    const favorite = await favoriteService.findFavoriteById(favoriteId);
    if (!favorite || favorite.userId !== userId) {
      res.status(404).json({ message: "Favorit hittades inte." });
      return;
    }

    await favoriteService.deleteFavorite(favoriteId);
    res.json({ message: "Favorit borttagen." });
  } catch (error) {
    console.error("Fel i removeFavorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};
