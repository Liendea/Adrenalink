// src/routes/exploreRoutes.ts
import { Router } from "express";
import { getExploreResults } from "../controllers/exploreController.js";
import { getSchools } from "../controllers/schoolController.js";

const router = Router();

// GET /api/explore
router.get("/", getExploreResults);

router.get("/", getSchools);

export default router;
