import Icon from "@/components/Icon";
import LocationIcon from "@/assets/icons/LocationIcon.svg";

type SchoolInfoProps = {
  name: string;
  location: string;
};

export const SchoolInfo = ({ name, location }: SchoolInfoProps) => (
  <div className="booking-card__school">
    <p className="booking-card__school-name">{name}</p>
    <p className="booking-card__school-location">
      <Icon src={LocationIcon} />
      {location}
    </p>
  </div>
);
