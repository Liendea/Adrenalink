import { useState } from "react";

import type { AvailableTimeSlot } from "@/types/types";
import "./BookingCard.scss";
import Icon from "@/components/Icon";
import ChevronLeft from "@/assets/icons/ChevronLeft.svg";
import ChevronRight from "@/assets/icons/ChevronRight.svg";
import LocationIcon from "@/assets/icons/LocationIcon.svg";
import Cta_Btn from "../buttons/Cta_Btn";
import image from "@/assets/image.png";

// ─── Date picker data ─────────────────────────────────────────────────────────
interface DayItem {
  short: string;
  num: number;
}

const DAYS: DayItem[] = [
  { short: "Mo", num: 5 },
  { short: "Tu", num: 6 },
  { short: "We", num: 7 },
  { short: "Th", num: 8 },
  { short: "Fr", num: 9 },
  { short: "Sa", num: 10 },
  { short: "Su", num: 11 },
];

// ─── Detail row ───────────────────────────────────────────────────────────────
interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="booking-card__detail-row">
    <span className="booking-card__detail-label">{label}</span>
    <span className="booking-card__detail-value">{value}</span>
  </div>
);

// ─── Props (RÄTTAD: Tar emot slot och id som number) ──────────────────────────
type BookingCardProps = {
  slot: AvailableTimeSlot; // Ändrat från lesson: Lesson
  onBook?: (lessonId: number, day: number, slot: AvailableTimeSlot) => void;
  onClose?: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function BookingCard({
  slot,
  onBook,
  onClose,
}: BookingCardProps) {
  // Bryt ut lektionen för att slippa skriva slot.lesson överallt
  const lesson = slot.lesson;

  const [selectedDay, setSelectedDay] = useState<number>(7);
  const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | null>(
    slot,
  );

  const handleBook = () => {
    if (!selectedSlot || !lesson) return;
    onBook?.(lesson.id, selectedDay, selectedSlot);
  };

  if (!lesson) return <div>Laddar lektionsinformation...</div>;

  // Räkna ut pris per timme (Pris / Timmar)
  const pricePerHour =
    lesson.durationHours > 0
      ? (lesson.priceEuro / lesson.durationHours).toFixed(1)
      : lesson.priceEuro;

  // Formatera starttiden för just denna specifika slot (t.ex "14:00")
  const slotTimeLabel = new Date(slot.startTime).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="booking-card">
      {/* ── Image ── */}
      <div className="booking-card__image-wrap">
        <img
          src={image}
          alt={lesson.lessonType}
          className="booking-card__image"
          loading="lazy"
        />
        {onClose && (
          <button
            className="booking-card__back"
            onClick={onClose}
            aria-label="Gå tillbaka"
          >
            <Icon src={ChevronLeft} />
          </button>
        )}
      </div>

      {/* ── Body ── */}
      <div className="booking-card__body">
        {/* Title + price */}
        <div className="booking-card__title-row">
          <h2 className="booking-card__title">
            {lesson.lessonType} - {lesson.sportType}
          </h2>
          <span className="booking-card__price-badge">${lesson.priceEuro}</span>
        </div>

        {/* Description */}
        <p className="booking-card__description">{lesson.description}</p>

        {/* Details table */}
        <div className="booking-card__details">
          <DetailRow
            label="Duration:"
            value={`${lesson.durationHours} hours`}
          />
          <DetailRow label="Price per hour:" value={`${pricePerHour}$`} />
          <DetailRow label="Level" value={lesson.level} />
          <DetailRow
            label="Equipment:"
            value={lesson.equipmentIncluded ? "Included" : "Not included"}
          />
        </div>

        {/* School + location (Hämtas nu via relationen från din backend include) */}
        <div className="booking-card__school">
          <p className="booking-card__school-name">
            {lesson.school?.name || "Surf School"}
          </p>
          <p className="booking-card__school-location">
            <Icon src={LocationIcon} />
            {lesson.location}
          </p>
        </div>

        <hr className="booking-card__divider" />

        {/* ── Booking section ── */}
        <h3 className="booking-card__section-title">Booking</h3>

        {/* Date picker */}
        <div className="booking-card__datepicker">
          <p className="booking-card__month">November</p>
          <div className="booking-card__days">
            <button
              className="booking-card__day-nav"
              aria-label="Föregående vecka"
            >
              <Icon src={ChevronLeft} />
            </button>

            {DAYS.map((day) => (
              <button
                key={day.num}
                className={`booking-card__day${selectedDay === day.num ? "booking-card__day--active" : ""}`}
                onClick={() => setSelectedDay(day.num)}
              >
                <span className="booking-card__day-short">{day.short}</span>
                <span className="booking-card__day-num">{day.num}</span>
                {selectedDay === day.num && (
                  <span className="booking-card__day-dot" />
                )}
              </button>
            ))}

            <button className="booking-card__day-nav" aria-label="Nästa vecka">
              <Icon src={ChevronRight} />
            </button>
          </div>
        </div>

        {/* Time slots */}
        <p className="booking-card__slots-label">Pick a time:</p>
        <div className="booking-card__slots">
          {/* Eftersom vi är på en specifik slot-id sida, visar vi denna valda slot */}
          <button
            className={`booking-card__slot booking-card__slot--active`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slotTimeLabel}
          </button>
        </div>

        {/* Book CTA */}
        <Cta_Btn onClick={handleBook}>Book</Cta_Btn>
      </div>
    </div>
  );
}
