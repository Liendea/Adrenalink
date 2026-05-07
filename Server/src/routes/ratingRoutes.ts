import { Router } from "express";
import {
  getSchoolRating,
  upsertSchoolRating,
} from "../controllers/ratingController.js";

const router = Router();

router.get("/schools/:schoolId", getSchoolRating);
router.post("/schools/:schoolId", upsertSchoolRating);

export default router;
