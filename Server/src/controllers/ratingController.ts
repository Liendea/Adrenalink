import type { Request, Response } from "express";
import * as ratingService from "../services/ratingService.js";

// GET /api/ratings/schools/:schoolId — hämta snittrating för en skola
export const getSchoolRating = async (req: Request, res: Response) => {
  try {
    // Plocka ut och validera schoolId från URL:en
    const schoolId = parseInt(String(req.params.schoolId));
    if (isNaN(schoolId)) {
      res.status(400).json({ message: "schoolId must be a number" });
      return;
    }

    // Fråga service-lagret efter snittrating och antal betyg
    const stats = await ratingService.getSchoolRatingStats(schoolId);
    res.json(stats);
  } catch (error) {
    console.error("Fel i getSchoolRating:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/ratings/schools/:schoolId — sätt eller uppdatera rating
export const upsertSchoolRating = async (req: Request, res: Response) => {
  try {
    // Plocka ut och validera schoolId från URL:en
    const schoolId = parseInt(String(req.params.schoolId));
    if (isNaN(schoolId)) {
      res.status(400).json({ message: "schoolId must be a number" });
      return;
    }

    // Plocka ut userId och score från request body
    const { userId, score } = req.body as { userId: number; score: number };

    // Validering — användaren måste vara inloggad
    if (!userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    // Validering — betyg måste vara mellan 1 och 5
    if (score < 1 || score > 5) {
      res.status(400).json({ message: "Score must be between 1 and 5" });
      return;
    }

    // Fråga service-lagret — uppdaterar betyget och returnerar ny snittrating
    const result = await ratingService.upsertSchoolRatingAndGetStats(
      schoolId,
      Number(userId),
      score,
    );
    res.json(result);
  } catch (error) {
    console.error("Fel i upsertSchoolRating:", error);
    res.status(500).json({ message: "Server error" });
  }
};
