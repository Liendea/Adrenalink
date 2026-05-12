import { prisma } from "../config/db.js";
import type { Prisma } from "@prisma/client";

type ExploreParams = {
  country?: string | undefined;
  location?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

export const findAvailableSlots = async ({
  country,
  location,
  startDate,
  endDate,
}: ExploreParams) => {
  // Bygg upp filtret för lediga tider
  const availableTimeWhere: Prisma.AvailableTimeWhereInput = {
    isBooked: false,
  };

  // Lägg till datumfilter om start eller slutdatum finns
  if (startDate || endDate) {
    availableTimeWhere.startTime = {};
    if (startDate) {
      (availableTimeWhere.startTime as Prisma.DateTimeFilter).gte = new Date(
        startDate,
      );
    }
    if (endDate) {
      (availableTimeWhere.startTime as Prisma.DateTimeFilter).lte = new Date(
        endDate,
      );
    }
  }

  // Bygg upp filtret för lektioner
  const lessonWhere: Prisma.LessonWhereInput = {};

  // Filtrera på land om det inte är "Nearby"
  if (country && country !== "Nearby") {
    lessonWhere.school = {
      country: { equals: country },
    };
  }

  // Filtrera på specifik strand/plats (fritext)
  if (location) {
    lessonWhere.location = { contains: location };
  }

  if (Object.keys(lessonWhere).length > 0) {
    availableTimeWhere.lesson = lessonWhere;
  }

  return prisma.availableTime.findMany({
    where: availableTimeWhere,
    include: {
      lesson: {
        include: { school: true },
      },
    },
    orderBy: { startTime: "asc" },
  });
};
