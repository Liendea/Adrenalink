// useSearch.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ActiveDropdown, SelectedItem, DateRange } from "@/types/types";

export function useSearch() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

  // State som tillåter SelectedItem eller null
  const [activeItem, setActiveItem] = useState<SelectedItem | null>({
    label: "Where?",
    sub: "Find destinations",
  });

  const [selectedDates, setSelectedDates] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const toggle = (name: ActiveDropdown) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  const handleSearch = () => {
    setActiveDropdown(null);

    // 1. EARLY RETURN - Detta säkrar activeItem för resten av funktionen
    if (!activeItem) return;

    // Vi skapar en referens som TS garanterat vet inte är null inuti closures
    const currentItem = activeItem;

    const buildParams = (coords?: { lat: number; lng: number }) => {
      const params = new URLSearchParams();

      if (currentItem.type === "nearby") {
        params.set("location", "Nearby");
        if (coords) {
          params.set("lat", String(coords.lat));
          params.set("lng", String(coords.lng));
        }
      } else if (currentItem.label && currentItem.label !== "Where?") {
        params.set("country", currentItem.label);
      }

      // .toISOString() kräver att det är ett Date-objekt, så vi checkar noga
      if (selectedDates.startDate instanceof Date) {
        params.set("startDate", selectedDates.startDate.toISOString());
      }
      if (selectedDates.endDate instanceof Date) {
        params.set("endDate", selectedDates.endDate.toISOString());
      }

      return params;
    };

    const doNavigate = (coords?: { lat: number; lng: number }) => {
      navigate(`/explore?${buildParams(coords).toString()}`);
    };

    // 2. GEOLOCATION LOGIK
    if (currentItem.type === "nearby") {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            doNavigate({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => doNavigate(), // Fallback om användaren nekar GPS
        );
      } else {
        doNavigate(); // Fallback om webbläsaren saknar stöd
      }
    } else {
      doNavigate();
    }
  };

  return {
    activeDropdown,
    setActiveDropdown,
    activeItem,
    setActiveItem,
    selectedDates,
    setSelectedDates,
    toggle,
    handleSearch,
  };
}
