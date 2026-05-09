import { useState, useEffect } from "react";

type Suggestion = {
  placeId: string;
  label: string;
  country: string;
};

export default function useLocationAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      const timer = setTimeout(() => setSuggestions([]), 0);
      return () => clearTimeout(timer);
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const encoded = encodeURIComponent(query);
        const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=5&addressdetails=1`;

        const res = await fetch(url, {
          signal: controller.signal,
          headers: { "Accept-Language": "en" },
        });

        const data = await res.json();

        const mapped: Suggestion[] = data.map(
          (item: {
            place_id: number;
            display_name: string;
            address: { country?: string };
          }) => ({
            placeId: String(item.place_id),
            label: item.display_name.split(",").slice(0, 2).join(",").trim(),
            country: item.address?.country ?? "",
          }),
        );

        setSuggestions(mapped);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Autocomplete error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return { suggestions, loading };
}
