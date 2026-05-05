import Icon from "@/components/Icon";
import LocationIcon from "@/assets/icons/locationIcon.svg";
import SportIcon from "@/assets/icons/SportIcon.svg";
import SchoolIcon from "@/assets/icons/SchoolIcon.svg";
import "./LocationDropDown.scss";
import type { SelectedItem } from "@/components/searchbar/Searchbar";

type LocationDropDownProps = {
  setActiveItem: (item: SelectedItem) => void;
};
// ─── Location Dropdown ────────────────────────────────────────────────────────
export default function LocationDropdown({
  setActiveItem,
}: LocationDropDownProps) {
  const handleClick = (label: string, sub: string) => {
    setActiveItem({ label, sub });
  };
  return (
    <div className="location-dropdown">
      {[
        {
          icon: <Icon src={LocationIcon} width={40} height={40} />,
          cls: "green",
          label: "Nearby",
          sub: "Find everything nearby",
        },
        {
          icon: <Icon src={SportIcon} width={40} height={40} />,
          cls: "pink",
          label: "Sport",
          sub: "Search by sport",
        },
        {
          icon: <Icon src={SchoolIcon} width={40} height={40} />,
          cls: "cyan",
          label: "School",
          sub: "Search by school",
        },
      ].map((item) => (
        <div
          className="location-dropdown__item"
          key={item.label}
          onClick={() => handleClick(item.label, item.sub)}
        >
          <div
            className={`location-dropdown__icon location-dropdown__icon--${item.cls}`}
          >
            {item.icon}
          </div>
          <div className="location-dropdown__text">
            <strong>{item.label}</strong>
            <span>{item.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
