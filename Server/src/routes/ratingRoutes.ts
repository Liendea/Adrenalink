import { Router } from "express";
import {
  getSchoolRating,
  upsertSchoolRating,
} from "../controllers/ratingController.js";
import { validateParamId } from "../middleware/validateParamId.js";

const router = Router();

router.get("/schools/:schoolId", validateParamId("schoolId"), getSchoolRating);
router.post(
  "/schools/:schoolId",
  validateParamId("schoolId"),
  upsertSchoolRating,
);

export default router;
