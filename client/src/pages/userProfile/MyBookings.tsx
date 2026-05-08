import { useNavigate } from "react-router-dom";
import "./MyBookings.scss";

export default function MyBookings() {
  const navigate = useNavigate();

  return (
    <div className="my-bookings">
      <div className="my-bookings__header">
        <button
          className="my-bookings__back"
          onClick={() => navigate("/profile")}
        >
          ‹ Back
        </button>
        <h1>My Bookings</h1>
      </div>
      <p className="my-bookings__placeholder">Bookings coming soon.</p>
    </div>
  );
}
