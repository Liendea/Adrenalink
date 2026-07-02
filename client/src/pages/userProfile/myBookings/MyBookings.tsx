import { useNavigate } from "react-router-dom";
import { useMyBookings } from "@/hooks/useMyBookings";
import "./MyBookings.scss";
import type { Booking } from "@/types/types";

export default function MyBookings() {
  const navigate = useNavigate();
  const { bookings, loading, error } = useMyBookings();

  return (
    <div className="my-bookings">
      <div className="my-bookings__header">
        <h1>Under development</h1>
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />

        <button
          className="my-bookings__back"
          onClick={() => navigate("/profile")}
        >
          ‹ Back
        </button>
        <h3>My Bookings</h3>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="my-bookings__error">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="my-bookings__placeholder">No bookings yet.</p>
      )}

      <ul className="my-bookings__list">
        {bookings.map((booking: Booking) => (
          <li key={booking.lessonId} className="my-bookings__item">
            <p className="my-bookings__lesson">{booking.lesson.lessonType}</p>
            <p className="my-bookings__date">{booking.slot.startTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
