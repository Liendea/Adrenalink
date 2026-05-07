// useSearch.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ActiveDropdown, SelectedItem, DateRange } from "@/types/types";

export function useSearch() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const [activeItem, setActiveItem] = useState<SelectedItem>({
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

    const buildParams = (coords?: { lat: number; lng: number }) => {
      const params = new URLSearchParams();
      if (activeItem.type === "nearby") {
        params.set("location", "Nearby");
        if (coords) {
          params.set("lat", String(coords.lat));
          params.set("lng", String(coords.lng));
        }
      } else if (activeItem.label && activeItem.label !== "Where?") {
        // Skicka bara country om användaren faktiskt valt något
        params.set("country", activeItem.label);
      }

      if (selectedDates.startDate)
        params.set("startDate", selectedDates.startDate.toISOString());
      if (selectedDates.endDate)
        params.set("endDate", selectedDates.endDate.toISOString());

      return params;
    };

    const doNavigate = (coords?: { lat: number; lng: number }) => {
      navigate(`/explore?${buildParams(coords).toString()}`);
    };

    if (activeItem.type === "nearby") {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          doNavigate({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => doNavigate(),
      );
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
