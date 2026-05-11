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

  // --- SENIOR FIX: DEDUPLICERING ---
  const slotsByLesson = new Map<number, AvailableTimeSlot>();

  // Vi säkerställer att det är en array och loopar säkert
  const rawSlots: AvailableTimeSlot[] = data.availableSlots || [];

  rawSlots.forEach((slot) => {
    // Genom att kolla att både lesson och id finns här, "smalnar" vi av typen
    if (slot.lesson && slot.lesson.id) {
      const lessonId = slot.lesson.id; // Nu vet TS att detta är en 'number'

      if (!slotsByLesson.has(lessonId)) {
        slotsByLesson.set(lessonId, slot);
      }
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
    staleTime: 1000 * 60 * 2,
  });

  return {
    // Returnerar alltid en array, även om data är undefined
    activities: data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
