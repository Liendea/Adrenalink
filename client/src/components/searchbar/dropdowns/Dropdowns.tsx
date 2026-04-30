import Calendar from "@/components/searchbar/dropdowns/calendar/Calendar";
import LocationDropdown from "@/components/searchbar/dropdowns/location/LocationDropDown";
import "./Dropdowns.scss";

export default function Dropdowns({ setActiveDropdown, activeDropdown }) {
  return (
    <div className="landing__dropdowns">
      {activeDropdown === "location" && <LocationDropdown />}
      {activeDropdown === "calendar" && (
        <Calendar onClose={() => setActiveDropdown(null)} />
      )}
    </div>
  );
}
