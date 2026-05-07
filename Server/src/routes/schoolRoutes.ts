import { Router } from "express";
import { getSchools } from "../controllers/schoolController.js";

const router = Router();

router.get("/", getSchools);

export default router;
