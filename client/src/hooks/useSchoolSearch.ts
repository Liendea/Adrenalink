import { useState, useEffect } from "react";
import type { School } from "@/types/types"; // anpassa till din School-typ

type UseSchoolSearchParams = {
  country: string | null;
  enabled: boolean; // hämtar bara när true
};

export default function useSchoolSearch({
  country,
  enabled,
}: UseSchoolSearchParams) {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useSchoolSearch triggered:", { enabled, country });
    if (!enabled) return;

    const fetchSchools = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (country) params.set("country", country);

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/schools?${params.toString()}`,
        );

        if (!response.ok) throw new Error("Failed to fetch schools");

        const data = await response.json();
        setSchools(data.schools || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [country, enabled]);

  return { schools, loading, error };
}
