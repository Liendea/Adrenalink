import Icon from "@/components/Icon";
import LocationIcon from "@/assets/icons/LocationIcon.svg";
import "../BookingPage.scss";

type SchoolInfoProps = {
  name: string;
  location: string;
};

export const SchoolInfo = ({ name, location }: SchoolInfoProps) => (
  <div className="booking-page__school">
    <p className="booking-page__school-name">{name}</p>
    <p className="booking-page__school-location">
      <Icon src={LocationIcon} />
      {location}
    </p>
  </div>
);
