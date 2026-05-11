import { Router } from "express";
import { getSchools, getSchoolById } from "../controllers/schoolController.js";

const router = Router();

router.get("/", getSchools);
router.get("/:schoolId", getSchoolById);

export default router;
