import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import type { Prisma } from "@prisma/client";

// hämta alla skolor
export const getSchools = async (req: Request, res: Response) => {
  try {
    const { country } = req.query;

    const where: Prisma.SchoolWhereInput = country
      ? { country: { equals: String(country) } }
      : {};

    const schools = await prisma.school.findMany({
      where,
      include: {
        lessons: true,
        ratings: {
          select: { score: true }, // bara score, inte userId etc.
        },
      },
      orderBy: { name: "asc" },
    });

    res.json({ schools });
  } catch (error) {
    console.error("Fel i getSchools:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Hämta skola utifrån Id
export const getSchoolById = async (req: Request, res: Response) => {
  try {
    const schoolId = parseInt(String(req.params.schoolId));

    if (isNaN(schoolId)) {
      res.status(400).json({ message: "schoolId måste vara ett nummer." });
      return;
    }

    const school = await prisma.school.findUnique({
      where: { id: schoolId },
      include: {
        lessons: true,
        ratings: {
          select: { score: true },
        },
      },
    });

    if (!school) {
      res.status(404).json({ message: "Skolan hittades inte." });
      return;
    }

    const count = school.ratings.length;
    const average =
      count > 0
        ? school.ratings.reduce((sum, r) => sum + r.score, 0) / count
        : 0;

    res.json({
      ...school,
      averageRating: average,
      ratingCount: count,
    });
  } catch (error) {
    console.error("Fel i getSchoolById:", error);
    res.status(500).json({ message: "Server error" });
  }
};
