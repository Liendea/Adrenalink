import { Router } from "express";
import { getSchools, getSchoolById } from "../controllers/schoolController.js";
import { validateParamId } from "../middleware/validateParamId.js";

const router = Router();

router.get("/", getSchools);
router.get("/:schoolId", validateParamId("schoolId"), getSchoolById);

export default router;
