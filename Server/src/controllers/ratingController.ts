import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import type { Prisma } from "@prisma/client";

// GET /api/ratings/schools/:schoolId – hämta snittrating för en skola

export const getSchoolRating = async (req: Request, res: Response) => {
  try {
    const { schoolId } = req.params;

    if (!schoolId) {
      res.status(400).json({ message: "schoolId is required" });
      return;
    }

    const schoolIdInt = parseInt(String(schoolId));

    if (isNaN(schoolIdInt)) {
      res.status(400).json({ message: "schoolId must be a number" });
      return;
    }

    const result = await prisma.rating.aggregate({
      where: { schoolId: schoolIdInt },
      _avg: { score: true },
      _count: { score: true },
    });

    res.json({
      average: result._avg.score ?? 0,
      count: result._count.score,
    });
  } catch (error) {
    console.error("Fel i getSchoolRating:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/ratings/schools/:schoolId – sätt eller uppdatera rating
export const upsertSchoolRating = async (req: Request, res: Response) => {
  try {
    const schoolIdInt = parseInt(String(req.params.schoolId));
    const { userId, score } = req.body as { userId: number; score: number };

    if (!userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    if (isNaN(schoolIdInt)) {
      res.status(400).json({ message: "schoolId must be a number" });
      return;
    }

    if (score < 1 || score > 5) {
      res.status(400).json({ message: "Score must be between 1 and 5" });
      return;
    }

    const where: Prisma.RatingWhereUniqueInput = {
      schoolId_userId: { schoolId: schoolIdInt, userId },
    };

    const rating = await prisma.rating.upsert({
      where,
      update: { score },
      create: { schoolId: schoolIdInt, userId: Number(userId), score },
    });

    const result = await prisma.rating.aggregate({
      where: { schoolId: schoolIdInt },
      _avg: { score: true },
      _count: { score: true },
    });

    res.json({
      rating,
      average: result._avg.score ?? 0,
      count: result._count.score,
    });
  } catch (error) {
    console.error("Fel i upsertSchoolRating:", error);
    res.status(500).json({ message: "Server error" });
  }
};
