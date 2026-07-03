import type { Request, Response } from "express";
import * as authService from "../services/authService.js";

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, passportNumber } = req.body;

    // Kolla om email eller passnummer redan används
    const existingUser = await authService.findExistingUser(
      email,
      passportNumber,
    );
    if (existingUser) {
      return res.status(400).json({
        message: "Användare med denna email eller passnummer finns redan.",
      });
    }

    // Skapa användaren — hashning sker i service-lagret
    const newUser = await authService.createUser(req.body);
    res.status(201).json({ message: "Användare skapad!", userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel vid registrering." });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verifiera email och lösenord — returnerar null om fel
    const user = await authService.verifyUserCredentials(email, password);
    if (!user) {
      return res.status(401).json({ message: "Fel e-post eller lösenord" });
    }

    // Skapa JWT-token för sessionen
    const token = authService.createToken(user.id, user.role);

    // Skicka svar — lösenordet skickas aldrig tillbaka
    res.json({
      message: "Inloggning lyckades",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        passportNumber: user.passportNumber,
        address: user.address,
        zipCode: user.zipCode,
        city: user.city,
        country: user.country,
        phoneCode: user.phoneCode,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Serverfel vid inloggning." });
  }
};

// PATCH /api/auth/profile-image
export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    const { userId, imageBase64 } = req.body as {
      userId: number;
      imageBase64: string;
    };

    // Validering — båda fälten krävs
    if (!userId || !imageBase64) {
      res.status(400).json({ message: "userId och imageBase64 krävs." });
      return;
    }

    // Uppdatera bilden via service-lagret
    const updatedUser = await authService.updateUserProfileImage(
      userId,
      imageBase64,
    );
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Fel i updateProfileImage:", error);
    res.status(500).json({ message: "Serverfel." });
  }
};

// PATCH /api/auth/profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    // userId hämtas från JWT-token via auth-middleware
    const userId = req.user.id;

    // Uppdatera profilen via service-lagret
    const updatedUser = await authService.updateUserProfile(userId, req.body);
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Fel i updateProfile:", error);
    res.status(500).json({ message: "Serverfel." });
  }
};
