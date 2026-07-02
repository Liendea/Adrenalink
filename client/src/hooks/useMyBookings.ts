import { useQuery } from "@tanstack/react-query";
import type { Booking } from "@/types/types";

const fetchMyBookings = async (): Promise<Booking[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/profile/bookings`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

export function useMyBookings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myBookings"],
    queryFn: fetchMyBookings,
  });

  return {
    bookings: data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
