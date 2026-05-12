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

    // Skicka tillbaka skolorna som JSON
    res.json({ schools });
  } catch (error) {
    // Något oväntat gick fel — logga felet och skicka 500 (internt serverfel)
    console.error("Fel i getSchools:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/schools/:schoolId
// Hämtar en specifik skola med snittbetyg baserat på ID
export const getSchoolById = async (req: Request, res: Response) => {
  try {
    // Plocka ut schoolId från URL:en och omvandla från sträng till nummer
    // t.ex. /api/schools/5 → schoolId = 5
    const schoolId = parseInt(String(req.params.schoolId));

    // Validering — om ID inte är ett nummer (t.ex. /api/schools/abc) avvisa direkt
    // 400 = Bad Request, användaren skickade fel data
    if (isNaN(schoolId)) {
      res.status(400).json({ message: "schoolId måste vara ett nummer." });
      return;
    }

    // Fråga service-lagret efter skolan — returnerar även uträknat snittbetyg
    const school = await schoolService.findSchoolById(schoolId);

    // Om skolan inte finns i databasen — skicka 404 (Not Found)
    if (!school) {
      res.status(404).json({ message: "Skolan hittades inte." });
      return;
    }

    // Allt gick bra — skicka tillbaka skolan med betygsdata som JSON
    res.json(school);
  } catch (error) {
    // Något oväntat gick fel — logga felet och skicka 500
    console.error("Fel i getSchoolById:", error);
    res.status(500).json({ message: "Server error" });
  }
};
