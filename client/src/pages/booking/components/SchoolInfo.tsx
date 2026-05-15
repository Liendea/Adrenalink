import Icon from "@/components/Icon";
import LocationIcon from "@/assets/icons/LocationIcon.svg";
import "../BookingPage.scss";

type SchoolInfoProps = {
  name: string;
  location: string;
};

export const SchoolInfo = ({ name, location }: SchoolInfoProps) => (
  <div className="booking-section__school">
    <p className="booking-section__school-name">{name}</p>
    <p className="booking-section__school-location">
      <Icon src={LocationIcon} />
      {location}
    </p>
  </div>
);
