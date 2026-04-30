import SearchIcon from "@/assets/icons/SearchIcon.svg";
import Icon from "../Icon";
import Dropdowns from "./dropdowns/Dropdowns";
import { useState } from "react";
import "./Searchbar.scss";

type ActiveDropdown = "location" | "calendar" | null;

export default function Searchbar() {
  const [activeDropdown, setActiveDropdown] =
    useState<ActiveDropdown>("location");

  const toggle = (name: ActiveDropdown) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  return (
    <div className="landing__search-bar">
      {/* WHERE */}
      <div className="search-field-wrapper">
        <div
          className="landing__search-field"
          onClick={() => toggle("location")}
        >
          <label>Where?</label>
          <span>Find destinations</span>
        </div>
        {activeDropdown === "location" && (
          <div className="dropdown__anchor">
            <Dropdowns
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
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
          <label>When?</label>
          <span>Choose dates</span>
        </div>
        {activeDropdown === "calendar" && (
          <div className="dropdown__anchor">
            <Dropdowns
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
        )}
      </div>

      <button
        className="landing__search-btn"
        onClick={() => setActiveDropdown(null)}
      >
        <Icon src={SearchIcon} />
        Search
      </button>
    </div>
  );
}
