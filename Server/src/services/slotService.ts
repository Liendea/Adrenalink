import { prisma } from "../config/db.js";

export const findSlotById = async (slotId: number) => {
  return prisma.availableTime.findUnique({
    where: { id: slotId },
    include: {
      lesson: {
        include: { school: true },
      },
    },
  });
};

export const findAvailableSlotsByLessonId = async (lessonId: number) => {
  return prisma.availableTime.findMany({
    where: { lessonId, isBooked: false },
    orderBy: { startTime: "asc" },
  });
};

export const findLessonWithAvailableSlots = async (lessonId: number) => {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      school: true,
      availableTimes: {
        orderBy: { startTime: "asc" },
      },
    },
  });
};
