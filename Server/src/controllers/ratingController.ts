import type { Request, Response } from "express";
import * as ratingService from "../services/ratingService.js";

export const getSchoolRating = async (req: Request, res: Response) => {
  try {
    const schoolId = parseInt(String(req.params.schoolId)); // middleware garanterar att detta är ett nummer
    const stats = await ratingService.getSchoolRatingStats(schoolId);
    res.json(stats);
  } catch (error) {
    console.error("Fel i getSchoolRating:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const upsertSchoolRating = async (req: Request, res: Response) => {
  try {
    const schoolId = parseInt(String(req.params.schoolId));

    if (!req.user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const userId = req.user.id;
    const { score } = req.body;

    if (score < 1 || score > 5) {
      res.status(400).json({ message: "Score must be between 1 and 5" });
      return;
    }

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
