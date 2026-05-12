import SearchIcon from "@/assets/icons/SearchIcon.svg";
import Icon from "../Icon";
import Dropdowns from "./dropdowns/Dropdowns";
import { useSearch } from "@/hooks/useSearch";
import "./Searchbar.scss";
import { useRef, useCallback } from "react";
import useClickOutside from "@/hooks/useClickOutside";

export default function Searchbar() {
  const {
    activeDropdown,
    setActiveDropdown,
    activeItem,
    setActiveItem,
    selectedDates,
    setSelectedDates,
    toggle,
    handleSearch,
  } = useSearch();

  const searchbarRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, [setActiveDropdown]);

  useClickOutside(searchbarRef, closeDropdown);

  return (
    <div className="search-bar" ref={searchbarRef}>
      {/* WHERE */}
      <div className="search-field-wrapper">
        <div className="search-field" onClick={() => toggle("location")}>
          <label className="location-label">{activeItem?.label}</label>
          <span className="location-sub">{activeItem?.sub}</span>
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
        <div className="search-field" onClick={() => toggle("calendar")}>
          <label>When?</label>
          <span>
            {selectedDates.startDate
              ? `${selectedDates.startDate.toLocaleDateString("sv-SE", { day: "numeric", month: "short" })} ${selectedDates.endDate ? "- " + selectedDates.endDate.toLocaleDateString("sv-SE", { day: "numeric", month: "short" }) : ""}`
              : "Choose dates"}
          </span>
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

      <button className="search-btn" onClick={handleSearch}>
        <Icon src={SearchIcon} />
        Search
      </button>
    </div>
  );
}
