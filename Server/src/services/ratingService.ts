import { prisma } from "../config/db.js";
import type { Prisma } from "@prisma/client";

export const getSchoolRatingStats = async (schoolId: number) => {
  const result = await prisma.rating.aggregate({
    where: { schoolId },
    _avg: { score: true },
    _count: { score: true },
  });

  return {
    average: result._avg.score ?? 0,
    count: result._count.score,
  };
};

export const upsertSchoolRatingAndGetStats = async (
  schoolId: number,
  userId: number,
  score: number,
) => {
  const where: Prisma.RatingWhereUniqueInput = {
    schoolId_userId: { schoolId, userId },
  };

  // Sätt eller uppdatera betyget
  const rating = await prisma.rating.upsert({
    where,
    update: { score },
    create: { schoolId, userId, score },
  });

  // Hämta uppdaterad snittrating efter upsert
  const result = await prisma.rating.aggregate({
    where: { schoolId },
    _avg: { score: true },
    _count: { score: true },
  });

  return {
    rating,
    average: result._avg.score ?? 0,
    count: result._count.score,
  };
};
