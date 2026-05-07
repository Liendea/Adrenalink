import Icon from "@/components/Icon";
import LocationIcon from "@/assets/icons/locationIcon.svg";
import "./LocationDropDown.scss";
import type { SelectedItem } from "@/types/types";
import { useState } from "react";

type LocationDropDownProps = {
  setActiveItem: (item: SelectedItem) => void;
  setActiveDropdown: () => void;
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

  const filtered = DESTINATIONS.filter((d) =>
    d.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (item: Destination) => {
    setActiveItem({ label: item.label, sub: item.sub, type: item.type });
    setActiveDropdown(null);
  };

  const handleNearby = () => {
    setActiveItem({
      label: "Nearby",
      sub: "Use my location",
      type: "nearby",
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

      {/* Populära destinationer */}
      {filtered.length > 0 && (
        <>
          <div className="location-dropdown__divider" />
          <p className="location-dropdown__section-label">
            Popular destinations
          </p>
          {filtered.map((dest) => (
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

      {/* Fritext-alternativ om inget matchar */}
      {query.trim() && filtered.length === 0 && (
        <div className="location-dropdown__item" onClick={handleFreetext}>
          <div className="location-dropdown__icon location-dropdown__icon--gray">
            <span className="location-dropdown__flag">🔍</span>
          </div>
          <div className="location-dropdown__text">
            <strong>Search "{query}"</strong>
            <span>Find lessons in {query}</span>
          </div>
        </div>
      )}
    </div>
  );
}
