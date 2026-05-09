import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

const app: Application = express();

// Middleware
// 1. Konfigurera CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Tillåt bara din frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Tillåt cookies/headers om det behövs senare
  }),
);
app.use(express.json()); // Gör att backend kan ta emot JSON i req.body

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/ratings", ratingRoutes);

app.use("/api/favorites", favoriteRoutes);

// En enkel test-route
app.get("/", (req: Request, res: Response) => {
  res.send("Surf School API is running! 🏄‍♂️");
});

export default app;
