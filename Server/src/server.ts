import "dotenv/config";
import app from "./app.js";
import { connectDB, prisma } from "./config/db.js";

const PORT = process.env.PORT || 3000;

let server: any;

const startApp = async () => {
  try {
    // 1. Försök ansluta till databasen först
    await connectDB();

    // 2. Starta Express-servern
    server = app.listen(PORT, () => {
      console.log(`
🚀 Servern är igång!
📡 URL: http://localhost:${PORT}
🛠️  ORM: Prisma
      `);
    });
  } catch (error) {
    console.error("❌ Kunde inte starta applikationen:", error);
    process.exit(1);
  }
};

// ----- Graceful Shutdown ----- //
const shutdown = async (signal: string) => {
  console.log(`\n♻️  Tagit emot ${signal}. Stänger ner på ett säkert sätt...`);

  if (server) {
    server.close(async () => {
      try {
        await prisma.$disconnect();
        console.log("✅ MySQL-anslutning via Prisma stängd.");
        console.log("✅ Express-server stängd.");
        process.exit(0);
      } catch (err) {
        console.error("❌ Fel vid stängning av databas:", err);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
};

// Lyssna på signaler från terminalen (t.ex. Ctrl+C)
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Starta APP
startApp();
