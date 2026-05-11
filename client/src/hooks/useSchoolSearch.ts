import { useQuery } from "@tanstack/react-query";
import type { School } from "@/types/types";

type UseSchoolSearchParams = {
  country: string | null;
  enabled: boolean;
};

export default function useSchoolSearch({
  country,
  enabled,
}: UseSchoolSearchParams) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["schools", country],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (country) params.set("country", country);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/schools?${params.toString()}`,
      );

      if (!res.ok) throw new Error("Failed to fetch schools");

      const data = await res.json();
      return (data.schools ?? []) as School[];
    },
    enabled, // kör bara när enabled är true
  });

  return {
    schools: data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
