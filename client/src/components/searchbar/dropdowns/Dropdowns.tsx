import Calendar from "@/components/searchbar/dropdowns/calendar/Calendar";
import LocationDropdown from "@/components/searchbar/dropdowns/location/LocationDropDown";
import "./Dropdowns.scss";
import type { SelectedItem, ActiveDropdown, DateRange } from "@/types/types";

type DropdownsProps = {
  setActiveItem: (item: SelectedItem | null) => void;
  setActiveDropdown: (name: ActiveDropdown) => void;
  activeDropdown: ActiveDropdown;
  setSelectedDates: (dates: DateRange) => void;
};

export default function Dropdowns({
  setActiveItem,
  setActiveDropdown,
  activeDropdown,
  setSelectedDates,
}: DropdownsProps) {
  return (
    <div className="landing__dropdowns">
      {activeDropdown === "location" && (
        <LocationDropdown
          setActiveItem={setActiveItem}
          setActiveDropdown={setActiveDropdown}
        />
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
