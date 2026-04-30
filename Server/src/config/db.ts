import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    // Prisma ansluter automatiskt vid första anropet,
    //  gör en manuell anslutning för att verifiera att allt är ok vid start.
    await prisma.$connect();
    console.log("✅ MySQL-anslutning har etablerats via Prisma");
  } catch (error) {
    console.error("❌ Kunde inte ansluta till databasen via Prisma:", error);
    // Stäng ner om vi inte får kontakt med databasen
    process.exit(1);
  }
};
