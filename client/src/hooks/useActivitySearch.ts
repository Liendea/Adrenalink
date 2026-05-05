import type { AvailableTimeSlot } from "@/types/types";
import { useState, useEffect } from "react";

interface SearchParams {
  activeItem?: { label: string } | null;
  selectedDates?: { startDate: string | null; endDate: string | null } | null;
}

export default function useActivitySearch({
  activeItem,
  selectedDates,
}: SearchParams) {
  const [activities, setActivities] = useState<AvailableTimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Bryt ut värdena som enkla strängar/primitiver
  const locationLabel = activeItem?.label;
  const startDate = selectedDates?.startDate;
  const endDate = selectedDates?.endDate;

  useEffect(() => {
    const fetchFilteredActivities = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();

        // 2. Använd de utbrutna strängarna här inne
        if (locationLabel && locationLabel !== "Where?") {
          queryParams.append("location", locationLabel);
        }

        if (startDate) {
          queryParams.append("startDate", startDate);
        }
        if (endDate) {
          queryParams.append("endDate", endDate);
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/explore?${queryParams.toString()}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data.availableSlots || []);
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
  }, [locationLabel, startDate, endDate]); // 3. Nu är alla beroenden primitiva värden!

  return { activities, loading, error };
}
