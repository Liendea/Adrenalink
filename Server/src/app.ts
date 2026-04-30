import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

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

// En enkel test-route
app.get("/", (req: Request, res: Response) => {
  res.send("Surf School API is running! 🏄‍♂️");
});

export default app;
