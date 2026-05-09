import Icon from "@/components/Icon";
import LocationIcon from "@/assets/icons/locationIcon.svg";
import "./LocationDropDown.scss";
import type { SelectedItem } from "@/types/types";
import { useState } from "react";
import useLocationAutocomplete from "@/hooks/useAutoComplete";
import type { ActiveDropdown } from "@/types/types";

type LocationDropDownProps = {
  setActiveItem: (item: SelectedItem) => void;
  setActiveDropdown: (name: ActiveDropdown) => void;
};

type Destination = {
  icon: string;
  cls: string;
  label: string;
  sub: string;
  type: "nearby" | "destination";
};

const DESTINATIONS: Destination[] = [
  {
    icon: "🇪🇸",
    cls: "amber",
    label: "Spain",
    sub: "Warm waves, sunny slopes",
    type: "destination",
  },
  {
    icon: "🇵🇹",
    cls: "coral",
    label: "Portugal",
    sub: "Atlantic surf, mountain trails",
    type: "destination",
  },
  {
    icon: "🇫🇷",
    cls: "purple",
    label: "France",
    sub: "Alps, Pyrenees, Atlantic coast",
    type: "destination",
  },
  {
    icon: "🇸🇪",
    cls: "blue",
    label: "Sweden",
    sub: "Skiing, kayaking, wild trails",
    type: "destination",
  },
];

export default function LocationDropdown({
  setActiveItem,
  setActiveDropdown,
}: LocationDropDownProps) {
  const [query, setQuery] = useState("");
  const { suggestions, loading } = useLocationAutocomplete(query);

  const filteredDestinations = DESTINATIONS.filter((d) =>
    d.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (item: Destination) => {
    setActiveItem({ label: item.label, sub: item.sub, type: item.type });
    setActiveDropdown(null);
  };

  const handleNearby = () => {
    setActiveItem({ label: "Nearby", sub: "Use my location", type: "nearby" });
  };

  const handleSuggestion = (suggestion: { label: string; country: string }) => {
    setActiveItem({
      label: suggestion.label,
      sub: suggestion.country,
      type: "destination",
    });
  };

  const handleFreetext = () => {
    if (!query.trim()) return;
    setActiveItem({
      label: query.trim(),
      sub: `Search in ${query.trim()}`,
      type: "destination",
    });
  };

  return (
    <div className="location-dropdown">
      {/* Sökfält */}
      <div className="location-dropdown__search">
        <Icon src={LocationIcon} width={18} height={18} />
        <input
          type="text"
          placeholder="Search destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFreetext()}
          autoFocus
        />
        {loading && <span className="location-dropdown__spinner">...</span>}
      </div>

      <div className="location-dropdown__divider" />

      {/* Nearby */}
      <div className="location-dropdown__item" onClick={handleNearby}>
        <div className="location-dropdown__icon location-dropdown__icon--green">
          <Icon src={LocationIcon} width={40} height={40} />
        </div>
        <div className="location-dropdown__text">
          <strong>Nearby</strong>
          <span>Use my location</span>
        </div>
      </div>

      {/* Autocomplete-förslag från Nominatim */}
      {query.length >= 2 && suggestions.length > 0 && (
        <>
          <div className="location-dropdown__divider" />
          <p className="location-dropdown__section-label">Suggestions</p>
          {suggestions.map((s) => (
            <div
              key={s.placeId}
              className="location-dropdown__item"
              onClick={() => handleSuggestion(s)}
            >
              <div className="location-dropdown__icon location-dropdown__icon--gray">
                <span className="location-dropdown__flag">📍</span>
              </div>
              <div className="location-dropdown__text">
                <strong>{s.label}</strong>
                <span>{s.country}</span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Populära destinationer – visas när ingen fritext */}
      {query.length < 2 && filteredDestinations.length > 0 && (
        <>
          <div className="location-dropdown__divider" />
          <p className="location-dropdown__section-label">
            Popular destinations
          </p>
          {filteredDestinations.map((dest) => (
            <div
              className="location-dropdown__item"
              key={dest.label}
              onClick={() => handleSelect(dest)}
            >
              <div
                className={`location-dropdown__icon location-dropdown__icon--${dest.cls}`}
              >
                <span className="location-dropdown__flag">{dest.icon}</span>
              </div>
              <div className="location-dropdown__text">
                <strong>{dest.label}</strong>
                <span>{dest.sub}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
