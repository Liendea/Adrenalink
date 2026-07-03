import Icon from "@/components/Icon";
import Calendar from "@/assets/icons/Calendar_blue.svg";
import Clock from "@/assets/icons/Clock_blue.svg";
import Pin from "@/assets/icons/Pin.svg";
import "./BookingCard.scss";
import Cta_Btn from "../buttons/Cta_Btn";
import { Link } from "react-router-dom";

export type BookingStatus = "active" | "pending" | "completed" | "accepted";

export type BookingCardData = {
  id: number;
  imageUrl: string;
  title: string;
  schoolName: string;
  schoolId: number;
  location: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  active: "Active",
  pending: "Pending",
  completed: "Completed",
  accepted: "Accepted",
};

export default function BookingCard({ booking }: { booking: BookingCardData }) {
  return (
    <div className="booking-card">
      <div className="booking-card__image-wrapper">
        <img
          src={booking.imageUrl}
          alt={booking.title}
          className="booking-card__image"
        />
        <div className="booking-card__image-overlay" />
        <h2 className="booking-card__title">{booking.title}</h2>
      </div>

      <div className="booking-card__body">
        <div className="booking-card__row">
          <Link to={`/schools/${booking.schoolId}`}>
            <span className="booking-card__school">{booking.schoolName}</span>
          </Link>
          <span
            className={`booking-card__badge booking-card__badge--${booking.status}`}
          >
            {STATUS_LABEL[booking.status]}
          </span>
        </div>

        <div className="booking-card__location">
          <Icon src={Pin} width={14} height={14} />
          <span>{booking.location}</span>
        </div>

        <hr className="booking-card__divider" />

        <div className="booking-card__row booking-card__row--footer">
          <div className="booking-card__datetime">
            <span className="booking-card__datetime-item">
              <Icon src={Calendar} width={16} height={16} />
              {booking.date}
            </span>
            <span className="booking-card__datetime-item">
              <Icon src={Clock} width={16} height={16} />
              {booking.time}
            </span>
          </div>
          <span className="booking-card__price">€{booking.price}</span>
        </div>
      </div>
      {STATUS_LABEL[booking.status] === "Pending" ||
      STATUS_LABEL[booking.status] === "accepted" ? (
        <Cta_Btn
          onClick={() => alert("Cancel booking clicked")}
          disabled={false}
          className="booking-card__cancel-btn"
        >
          Cancel Booking
        </Cta_Btn>
      ) : null}
    </div>
  );
}
