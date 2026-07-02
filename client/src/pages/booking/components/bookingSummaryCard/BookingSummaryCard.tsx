import "./BookingSummaryCard.scss";
import type { Lesson } from "@/types/types";

export function BookingSummaryCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="booking-summary-card">
      <div className="booking-summary-card__header">
        <div>
          <img
            src={lesson.imageUrl}
            alt={lesson.sportType}
            className="booking-summary-card__lesson-image"
          />
          <p className="booking-summary-card__lesson-title">
            {lesson.lessonType} {lesson.sportType} lesson
          </p>
          <p className="booking-summary-card__instructor">
            {lesson.instructor}
          </p>
        </div>
      </div>

      <hr className="booking-summary-card__divider" />

      <div className="booking-summary-card__details">
        <div className="booking-summary-card__row">
          <span>Date</span>
          <span>{lesson.date}</span>
        </div>
        <div className="booking-summary-card__row">
          <span>Time</span>
          <span>{lesson.time}</span>
        </div>
        <div className="booking-summary-card__row">
          <span>Location</span>
          <span>{lesson.location}</span>
        </div>
      </div>

      <hr className="booking-summary-card__divider" />

      <div className="booking-summary-card__total">
        <span>Total</span>
        <span>{lesson.price}€</span>
      </div>
    </div>
  );
}
