import { useState } from "react";
import { useMyBookings } from "@/hooks/useMyBookings";
import BookingCard, {
  type BookingCardData,
  type BookingStatus,
} from "@/components/cards/BookingCard";
import { getLessonImage } from "@/utils/lessonImage";
import "./MyBookings.scss";

type BookingTab = "upcoming" | "completed" | "requests";

const TABS: { key: BookingTab; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "requests", label: "Requests" },
];

function formatLessonTitle(sportType: string, lessonType: string): string {
  const sport =
    sportType.charAt(0).toUpperCase() + sportType.slice(1).toLowerCase();
  const type = lessonType.toUpperCase() === "PRIVATE" ? "Private" : "Group";
  return `${sport} Lesson ${type}`;
}

function formatDate(startTime: string): string {
  return new Date(startTime)
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();
}

function formatTime(startTime: string): string {
  return new Date(startTime).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

// Status is derived from the slot's calendar day (UTC) relative to today (UTC):
// day already passed -> completed, day is today -> active, day still ahead -> pending.
function getBookingStatus(startTime: string): BookingStatus {
  const start = new Date(startTime);
  const now = new Date();

  const startDay = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate(),
  );
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );

  if (startDay < today) return "completed";
  if (startDay === today) return "active";
  return "pending";
}

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState<BookingTab>("upcoming");
  const { bookings, loading, error } = useMyBookings();

  const cards: BookingCardData[] =
    activeTab === "requests"
      ? []
      : bookings
          .map((booking) => ({
            booking,
            status: getBookingStatus(booking.slot.startTime),
          }))
          .filter(({ status }) =>
            activeTab === "upcoming"
              ? status !== "completed"
              : status === "completed",
          )
          .map(({ booking, status }) => ({
            id: booking.bookingId,
            imageUrl: getLessonImage(booking.lesson),
            title: formatLessonTitle(
              booking.lesson.lessonType,
              booking.lesson.sportType,
            ),
            schoolName: booking.lesson.school?.name ?? "",
            schoolId: booking.lesson.school?.id ?? 0,
            location: booking.lesson.school?.city ?? "",
            date: formatDate(booking.slot.startTime),
            time: formatTime(booking.slot.startTime),
            price: booking.lesson.price,
            status,
          }));

  return (
    <div className="my-bookings">
      <h1 className="my-bookings__title">My Bookings</h1>

      <div className="my-bookings__tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`my-bookings__tab${
              activeTab === tab.key ? " my-bookings__tab--active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "requests" ? (
        <p className="my-bookings__placeholder">
          Booking requests are coming soon.
        </p>
      ) : (
        <div className="my-bookings__list">
          {loading && <p className="my-bookings__placeholder">Loading...</p>}
          {error && <p className="my-bookings__error">{error}</p>}
          {!loading && !error && cards.length === 0 && (
            <p className="my-bookings__placeholder">
              {activeTab === "upcoming"
                ? "No upcoming bookings yet."
                : "No completed bookings yet."}
            </p>
          )}
          {cards.map((card) => (
            <BookingCard key={card.id} booking={card} />
          ))}
        </div>
      )}
    </div>
  );
}
