import { prisma } from "../config/db.js";
import type { Prisma } from "@prisma/client";

export const findAllSchools = async (country?: string) => {
  const where: Prisma.SchoolWhereInput = country
    ? { country: { equals: country } }
    : {};

  return prisma.school.findMany({
    where,
    include: {
      lessons: true,
      ratings: { select: { score: true } },
    },
    orderBy: { name: "asc" },
  });
};

export const findSchoolById = async (schoolId: number) => {
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    include: {
      lessons: true,
      ratings: { select: { score: true } },
    },
  });

  if (!school) return null;

  // Affärslogik — beräkna snittbetyg
  const count = school.ratings.length;
  const averageRating =
    count > 0 ? school.ratings.reduce((sum, r) => sum + r.score, 0) / count : 0;

  return { ...school, averageRating, ratingCount: count };
};
