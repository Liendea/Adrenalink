import { prisma } from "../config/db.js";

export const findFavoritesByUserId = async (userId: number) => {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      lesson: {
        include: { school: true },
      },
      school: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const createFavorite = async (
  userId: number,
  lessonId?: number,
  schoolId?: number,
) => {
  return prisma.favorite.create({
    data: {
      userId,
      lessonId: lessonId ?? null,
      schoolId: schoolId ?? null,
    },
    include: {
      lesson: {
        include: { school: true },
      },
      school: true,
    },
  });
};

export const findFavoriteById = async (favoriteId: number) => {
  return prisma.favorite.findUnique({
    where: { id: favoriteId },
  });
};

export const deleteFavorite = async (favoriteId: number) => {
  return prisma.favorite.delete({ where: { id: favoriteId } });
};
