import { prisma } from "@/config/db.js";

type CreateBookingInput = {
  userId: number;
  lessonId: number;
  slotId: number;
  name: string;
  email: string;
  phone: string;
  passportNumber: string;
};

export async function createBooking(input: CreateBookingInput) {
  return prisma.$transaction(async (tx) => {
    // Villkorad update: markerar slotten som bokad bara om den fortfarande är
    // ledig. Skyddar mot att två samtidiga bokningsförsök vinner racet.
    const { count } = await tx.availableTime.updateMany({
      where: { id: input.slotId, isBooked: false },
      data: { isBooked: true },
    });

    if (count === 0) {
      throw new Error("SLOT_UNAVAILABLE");
    }

    return tx.booking.create({ data: input });
  });
}

export async function getBookingsForUser(userId: number) {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { lesson: { include: { school: true } }, slot: true },
    orderBy: { slot: { startTime: "asc" } },
  });

  return bookings.map(({ id, lesson, ...booking }) => ({
    ...booking,
    bookingId: id,
    lesson: { ...lesson, price: lesson.price },
  }));
}
