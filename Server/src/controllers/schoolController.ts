import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import type { Prisma } from "@prisma/client";

// hämta skolor
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
