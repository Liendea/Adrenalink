// BookingDetails.tsx

import type { AvailableTimeSlot, LessonWithSlots } from "@/types/types";
import "./LessonDetails.scss";

type LessonDetailsProps = {
  lesson: LessonWithSlots;

  onBook?: (lessonId: number, day: number, slot: AvailableTimeSlot) => void;
  onClose?: () => void;
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="booking-card__detail-row">
    <span className="booking-card__detail-label">{label}</span>
    <span className="booking-card__detail-value">{value}</span>
  </div>
);

export default function LessonDetails({ lesson }: LessonDetailsProps) {
  const pricePerHour =
    lesson.durationHours > 0
      ? (lesson.priceEuro / lesson.durationHours).toFixed(1)
      : lesson.priceEuro;

  return (
    <div className="booking-card__info-section">
      <div className="booking-card__title-row">
        <h2 className="booking-card__title">
          {lesson.lessonType} {lesson.sportType} lesson
        </h2>
        <span className="booking-card__price-badge">${lesson.priceEuro}</span>
      </div>
      <p className="booking-card__description">{lesson.description}</p>
      <div className="booking-card__details">
        <DetailRow label="Duration:" value={`${lesson.durationHours} hours`} />
        <DetailRow label="Price per hour:" value={`${pricePerHour}$`} />
        <DetailRow label="Level" value={lesson.level} />
        <DetailRow
          label="Equipment:"
          value={lesson.equipmentIncluded ? "Included" : "Not included"}
        />
      </div>
    </div>
  );
}
