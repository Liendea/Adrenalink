import type { Request, Response } from "express";
import * as schoolService from "../services/schoolService.js";

// GET /api/schools
// Hämtar alla skolor, med möjlighet att filtrera på land via ?country=Sweden
export const getSchools = async (req: Request, res: Response) => {
  try {
    // Plocka ut country från query-strängen om det finns, annars undefined (= hämta alla)
    const country = req.query.country ? String(req.query.country) : undefined;

    // Fråga service-lagret
    const schools = await schoolService.findAllSchools(country);

    res.json({ schools });
  } catch (error) {
    console.error("Fel i getSchools:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/schools/:schoolId
// Hämtar en specifik skola med snittbetyg baserat på ID
export const getSchoolById = async (req: Request, res: Response) => {
  try {
    const schoolId = parseInt(String(req.params.schoolId)); // middleware garanterar giltigt nummer

    const school = await schoolService.findSchoolById(schoolId);
    if (!school) {
      res.status(404).json({ message: "Skolan hittades inte." });
      return;
    }

    res.json(school);
  } catch (error) {
    console.error("Fel i getSchoolById:", error);
    res.status(500).json({ message: "Server error" });
  }
};
