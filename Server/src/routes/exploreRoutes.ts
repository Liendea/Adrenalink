// src/routes/exploreRoutes.ts
import { Router } from "express";
import { getExploreResults } from "../controllers/exploreController.js";
import { getSchools } from "../controllers/schoolController.js";

const router = Router();

// GET /api/explore/lessons
router.get("/lessons", getExploreResults);

// GET /api/explore/schools
router.get("/schools", getSchools);

// GET /api/explore/rentals
// add later

export default router;
