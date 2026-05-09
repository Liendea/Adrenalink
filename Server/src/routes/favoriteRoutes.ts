import { Router } from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticateToken, getFavorites);
router.post("/", authenticateToken, addFavorite);
router.delete("/:id", authenticateToken, removeFavorite);

export default router;
