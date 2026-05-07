import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import type { Prisma } from "@prisma/client";

export const getExploreResults = async (req: Request, res: Response) => {
  try {
    const { country, location, startDate, endDate } = req.query;

    // AvailableTime-where: datum + isBooked
    const availableTimeWhere: Prisma.AvailableTimeWhereInput = {
      isBooked: false,
    };

    if (startDate || endDate) {
      availableTimeWhere.startTime = {};
      if (startDate) {
        (availableTimeWhere.startTime as Prisma.DateTimeFilter).gte = new Date(
          String(startDate),
        );
      }
      if (endDate) {
        (availableTimeWhere.startTime as Prisma.DateTimeFilter).lte = new Date(
          String(endDate),
        );
      }
    }

    // Lesson-where: filtrerar på skolans land och/eller specifik strand
    const lessonWhere: Prisma.LessonWhereInput = {};

    if (country && String(country) !== "Nearby") {
      lessonWhere.school = {
        country: {
          equals: String(country),
        },
      };
    }

    // location = specifik strand/vatten (fritext), används separat från country
    if (location) {
      lessonWhere.location = {
        contains: String(location),
      };
    }

    if (Object.keys(lessonWhere).length > 0) {
      availableTimeWhere.lesson = lessonWhere;
    }

    // Hämta lediga tider

    const availableSlots = await prisma.availableTime.findMany({
      where: availableTimeWhere,
      include: {
        lesson: {
          include: {
            school: true, // school.country finns här som String
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    res.json({
      message: "Här är dina sökresultat",
      criteria: { country, location, startDate, endDate },
      availableSlots,
    });
  } catch (error) {
    console.error("Fel i getExploreResults:", error);
    res.status(500).json({ message: "Server error" });
  }
};
