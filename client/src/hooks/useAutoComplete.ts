import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

type Suggestion = {
  placeId: string;
  label: string;
  country: string;
};

const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
  const encoded = encodeURIComponent(query);
  const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=5&addressdetails=1`;

  const res = await fetch(url, {
    headers: { "Accept-Language": "en" },
  });

  const data = await res.json();

  return data.map(
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
};

export default function useLocationAutocomplete(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce – uppdatera debouncedQuery 350ms efter att query slutat ändras
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isFetching } = useQuery({
    queryKey: ["autocomplete", debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // cache i 5 min – samma sökning hämtas inte om
    placeholderData: [],
  });

  return {
    suggestions: data ?? [],
    loading: isFetching,
  };
}
