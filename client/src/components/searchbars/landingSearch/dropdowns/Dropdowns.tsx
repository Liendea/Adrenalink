import Calendar from "@/components/searchbars/landingSearch/dropdowns/calendar/Calendar";
import LocationDropdown from "@/components/searchbar/dropdowns/location/LocationDropDown";
import "./Dropdowns.scss";

export default function Dropdowns({
  setActiveItem,
  setActiveDropdown,
  activeDropdown,
  setSelectedDates,
}) {
  return (
    <div className="landing__dropdowns">
      {activeDropdown === "location" && (
        <LocationDropdown setActiveItem={setActiveItem} />
      )}
      {activeDropdown === "calendar" && (
        <Calendar
          onClose={() => setActiveDropdown(null)}
          setSelectedDates={setSelectedDates}
        />
      )}
    </div>
  );
}
