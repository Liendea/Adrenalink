import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BookingFormData } from "@/pages/booking/components/bookingUserForm/BookingUserForm";
import type { Booking } from "@/types/types";

type CreateBookingPayload = BookingFormData & {
  lessonId: number;
  slotId: number;
};

const createBooking = async (
  payload: CreateBookingPayload,
): Promise<Booking> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? "Failed to create booking");
  }
  return res.json();
};

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["explore"] });
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
}
