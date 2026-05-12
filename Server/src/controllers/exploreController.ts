import type { Request, Response } from "express";
import * as exploreService from "../services/exploreService.js";

// GET /api/explore — hämta lediga tider baserat på sökkriterier
export const getExploreResults = async (req: Request, res: Response) => {
  try {
    // Plocka ut sökkriterier från query-strängen
    // t.ex. /api/explore?country=Sweden&startDate=2024-06-01
    const { country, location, startDate, endDate } = req.query;

    // Fråga service-lagret — all filtrerings-logik sker där
    const availableSlots = await exploreService.findAvailableSlots({
      country: country ? String(country) : undefined,
      location: location ? String(location) : undefined,
      startDate: startDate ? String(startDate) : undefined,
      endDate: endDate ? String(endDate) : undefined,
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
