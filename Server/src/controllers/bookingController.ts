import type { Request, Response } from "express";
import { createBooking } from "@/services/bookingService.js";

export async function createBookingHandler(req: Request, res: Response) {
  const { lessonId, slotId, name, email, phone, passportNumber } = req.body;

  try {
    const booking = await createBooking({
      userId: req.user.id,
      lessonId,
      slotId,
      name,
      email,
      phone,
      passportNumber,
    });

    res.status(201).json(booking);
  } catch (error) {
    if (error instanceof Error && error.message === "SLOT_UNAVAILABLE") {
      res.status(409).json({ message: "Den valda tiden är redan bokad." });
      return;
    }
    console.error("Fel i createBookingHandler:", error);
    res.status(500).json({ message: "Serverfel vid bokning." });
  }
}
