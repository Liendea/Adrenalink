import { useQuery } from "@tanstack/react-query";
import type { LessonWithSlots } from "@/types/types";

const fetchLesson = async (lessonId: string): Promise<LessonWithSlots> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/lesson/${lessonId}`,
  );
  if (!res.ok) throw new Error("Kunde inte hämta bokningsinfo");
  return res.json();
};

export function useBookingLesson(lessonId: string | undefined) {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => fetchLesson(lessonId!),
    enabled: !!lessonId, // Kör inte om lessonId saknas
    staleTime: 1000 * 60 * 2, // Cache i 2 minuter
  });
}
