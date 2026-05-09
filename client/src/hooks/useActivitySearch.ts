import type { AvailableTimeSlot } from "@/types/types";
import { useState, useEffect } from "react";

interface SearchParams {
  activeItem?: { label: string; type?: "nearby" | "destination" } | null;
  selectedDates?: { startDate: string | null; endDate: string | null } | null;
}

export default function useActivitySearch({
  activeItem,
  selectedDates,
}: SearchParams) {
  const [activities, setActivities] = useState<AvailableTimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const locationLabel = activeItem?.label;
  const locationType = activeItem?.type;
  const startDate = selectedDates?.startDate;
  const endDate = selectedDates?.endDate;

  useEffect(() => {
    const fetchFilteredActivities = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();

        if (locationLabel && locationLabel !== "Where?") {
          if (locationType === "nearby") {
            queryParams.append("location", "Nearby");
          } else {
            queryParams.append("country", locationLabel);
          }
        }

        if (startDate) queryParams.append("startDate", startDate);
        if (endDate) queryParams.append("endDate", endDate);

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/explore?${queryParams.toString()}`,
        );

        if (!response.ok) throw new Error("Failed to fetch activities");

        const data = await response.json();

        // Gruppera slots per lektion – behåll alla slots men visa bara en rad per lektion
        const slotsByLesson = new Map<number, AvailableTimeSlot>();
        (data.availableSlots || []).forEach((slot: AvailableTimeSlot) => {
          if (!slotsByLesson.has(slot.lesson.id)) {
            slotsByLesson.set(slot.lesson.id, slot);
          }
        });

        setActivities(Array.from(slotsByLesson.values()));
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error loading activities:", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error loading activities:", err);
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredActivities();
  }, [locationLabel, locationType, startDate, endDate]);

  return { activities, loading, error };
}
