import SearchIcon from "@/assets/icons/SearchIcon.svg";
import Icon from "../Icon";
import Dropdowns from "./dropdowns/Dropdowns";
import { useState } from "react";
import "./Searchbar.scss";
import { useNavigate } from "react-router-dom";

type ActiveDropdown = "location" | "calendar" | null;

export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export type SelectedItem = {
  label: string;
  sub: string;
};

export default function Searchbar() {
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
    setActiveDropdown(null); // Stäng eventuella öppna dropdowns

    navigate("/explore", {
      state: {
        activeItem,
        selectedDates: {
          // Vi konverterar datumen till ISO-strängar så att de säkert överlever navigeringen
          startDate: selectedDates.startDate
            ? selectedDates.startDate.toISOString()
            : null,
          endDate: selectedDates.endDate
            ? selectedDates.endDate.toISOString()
            : null,
        },
      },
    });
  };

  return (
    <div className="landing__search-bar">
      {/* WHERE */}
      <div className="search-field-wrapper">
        <div
          className="landing__search-field"
          onClick={() => toggle("location")}
        >
          <label>{activeItem.label}</label>
          <span>{activeItem.sub}</span>
        </div>
        {activeDropdown === "location" && (
          <div className="dropdown__anchor">
            <Dropdowns
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              setActiveItem={setActiveItem}
              setSelectedDates={setSelectedDates}
            />
          </div>
        )}
      </div>
      {/* WHEN */}
      <div className="search-field-wrapper">
        <div
          className="landing__search-field"
          onClick={() => toggle("calendar")}
        >
          {selectedDates && selectedDates.startDate ? (
            <>
              <label>When?</label>
              <span>
                {selectedDates.startDate.toLocaleDateString("sv-SE", {
                  day: "numeric",
                  month: "short",
                })}
                {selectedDates.endDate &&
                  selectedDates.endDate !== selectedDates.startDate &&
                  ` - ${selectedDates.endDate.toLocaleDateString("sv-SE", { day: "numeric", month: "short" })}`}
              </span>
            </>
          ) : (
            <>
              <label>When?</label>
              <span>Choose dates</span>
            </>
          )}
        </div>
        {activeDropdown === "calendar" && (
          <div className="dropdown__anchor">
            <Dropdowns
              setActiveItem={setActiveItem}
              setSelectedDates={setSelectedDates}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
        )}
      </div>

      <button className="landing__search-btn" onClick={handleSearch}>
        <Icon src={SearchIcon} />
        Search
      </button>
    </div>
  );
}
