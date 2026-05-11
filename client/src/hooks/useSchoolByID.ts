import { useQuery } from "@tanstack/react-query";
import type { School } from "@/types/types";

export default function useSchoolById(schoolId: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/schools/${schoolId}`,
      );
      if (!res.ok) throw new Error("Kunde inte hämta skolan.");
      return res.json() as Promise<School>;
    },
    enabled: !!schoolId, // kör bara om schoolId finns
  });

  return { school: data ?? null, loading: isLoading, error };
}
