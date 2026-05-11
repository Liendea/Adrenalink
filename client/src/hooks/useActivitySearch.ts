import { useQuery } from "@tanstack/react-query";
import type { AvailableTimeSlot } from "@/types/types";

type SearchParams = {
  activeItem?: { label: string; type?: "nearby" | "destination" } | null;
  selectedDates?: { startDate: string | null; endDate: string | null } | null;
};

const fetchActivities = async (
  locationLabel: string | undefined,
  locationType: string | undefined,
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): Promise<AvailableTimeSlot[]> => {
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

  // Deduplicera – en rad per lektion
  const slotsByLesson = new Map<number, AvailableTimeSlot>();
  (data.availableSlots || []).forEach((slot: AvailableTimeSlot) => {
    if (!slotsByLesson.has(slot.lesson.id)) {
      slotsByLesson.set(slot.lesson.id, slot);
    }
  });

  return Array.from(slotsByLesson.values());
};

export default function useActivitySearch({
  activeItem,
  selectedDates,
}: SearchParams) {
  const locationLabel = activeItem?.label;
  const locationType = activeItem?.type;
  const startDate = selectedDates?.startDate;
  const endDate = selectedDates?.endDate;

  const { data, isLoading, error } = useQuery({
    queryKey: ["activities", locationLabel, locationType, startDate, endDate],
    queryFn: () =>
      fetchActivities(locationLabel, locationType, startDate, endDate),
    staleTime: 1000 * 60 * 2, // cache i 2 min
  });

  return {
    activities: data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
