import { useQuery } from "@tanstack/react-query";
import type { AvailableTimeSlot, School } from "@/types/types";

type ExploreParams = {
  country?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

const fetchExploreData = async ({
  country,
  startDate,
  endDate,
}: ExploreParams) => {
  const params = new URLSearchParams();
  if (country) params.set("country", country);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  const [activitiesRes, schoolsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_BASE_URL}/explore/lessons?${params}`),
    fetch(`${import.meta.env.VITE_API_BASE_URL}/explore/schools?${params}`),
  ]);

  if (!activitiesRes.ok) throw new Error("Failed to fetch activities");
  if (!schoolsRes.ok) throw new Error("Failed to fetch schools");

  const [activitiesData, schoolsData] = await Promise.all([
    activitiesRes.json(),
    schoolsRes.json(),
  ]);

  const rawSlots: AvailableTimeSlot[] = activitiesData.availableSlots ?? [];
  const slotsByLesson = new Map<number, AvailableTimeSlot>();
  rawSlots.forEach((slot) => {
    if (slot.lesson?.id && !slotsByLesson.has(slot.lesson.id)) {
      slotsByLesson.set(slot.lesson.id, slot);
    }
  });

  return {
    activities: Array.from(slotsByLesson.values()),
    schools: (schoolsData.schools ?? []) as School[],
  };
};

export default function useExploreSearch({
  country,
  startDate,
  endDate,
}: ExploreParams) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["explore", country, startDate, endDate],
    queryFn: () => fetchExploreData({ country, startDate, endDate }),
    staleTime: 1000 * 60 * 2,
  });

  return {
    activities: data?.activities ?? [],
    schools: data?.schools ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
