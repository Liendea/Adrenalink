import type { Request, Response } from "express";
import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ----- REGISTTRERA ----- //
export const register = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      passportNo,
      address,
      zipCode,
      city,
      country,
      phoneCode,
      phoneNumber,
    } = req.body;

    // Kolla om användaren redan finns (via email eller passnummer)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { passportNo: passportNo }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Användare med denna email eller passnummer finns redan.",
      });
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    // Spara i databasen via Prisma
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        passportNo,
        address,
        zipCode,
        city,
        country,
        phoneCode,
        phoneNumber,
      },
    });

    res.status(201).json({
      message: "Användare skapad!",
      userId: newUser.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel vid registrering." });
  }
};

// ----- LOGIN ----- //
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Hitta användaren
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Fel e-post eller lösenord" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Fel e-post eller lösenord" });
    }

    // Skapa JWT-Token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "fallback_secrert",
      { expiresIn: "1d" }, // token gäller 24h
    );

    // Skicka svar (skicka inte med lösenordet tillbaka!)
    res.json({
      message: "Inloggning lyckades",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Serverfel vid inloggning." });
  }
};
