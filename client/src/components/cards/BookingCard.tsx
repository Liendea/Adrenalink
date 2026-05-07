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
type DayItem = {
  short: string;
  num: number;
};

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
type DetailRowProps = {
  label: string;
  value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="booking-card__detail-row">
    <span className="booking-card__detail-label">{label}</span>
    <span className="booking-card__detail-value">{value}</span>
  </div>
);

// ─── Props ────────────────────────────────────────────────────────────────────
type BookingCardProps = {
  slot: AvailableTimeSlot;
  allSlots?: AvailableTimeSlot[]; // alla slots för samma lektion
  onBook?: (lessonId: number, day: number, slot: AvailableTimeSlot) => void;
  onClose?: () => void;
};

export default function BookingCard({
  slot,
  allSlots = [],
  onBook,
  onClose,
}: BookingCardProps) {
  const lesson = slot.lesson;
  const [selectedDay, setSelectedDay] = useState<number>(
    new Date(slot.startTime).getDate(),
  );
  const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | null>(
    slot,
  );

  // Filtrera slots på valt datum
  const slotsForSelectedDay = allSlots.filter((s) => {
    const date = new Date(s.startTime);
    return date.getDate() === selectedDay && !s.isBooked;
  });

  const handleBook = () => {
    if (!selectedSlot || !lesson) return;
    onBook?.(lesson.id, selectedDay, selectedSlot);
  };

  // Nollställ vald slot när dag byts
  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    setSelectedSlot(null);
  };

  if (!lesson) return <div>Laddar lektionsinformation...</div>;

  const pricePerHour =
    lesson.durationHours > 0
      ? (lesson.priceEuro / lesson.durationHours).toFixed(1)
      : lesson.priceEuro;

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
        <div className="booking-card__title-row">
          <h2 className="booking-card__title">
            {lesson.lessonType} {lesson.sportType} lesson
          </h2>
          <span className="booking-card__price-badge">${lesson.priceEuro}</span>
        </div>

        <p className="booking-card__description">{lesson.description}</p>

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

        <div className="booking-card__school">
          <p className="booking-card__school-name">
            {lesson.school?.name || "School"}
          </p>
          <p className="booking-card__school-location">
            <Icon src={LocationIcon} />
            {lesson.location}
          </p>
        </div>

        <hr className="booking-card__divider" />

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
                className={`booking-card__day${selectedDay === day.num ? " booking-card__day--active" : ""}`}
                onClick={() => handleDayChange(day.num)}
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
          {slotsForSelectedDay.length > 0 ? (
            slotsForSelectedDay.map((s) => {
              const timeLabel = new Date(s.startTime).toLocaleTimeString(
                "sv-SE",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );
              return (
                <button
                  key={s.id}
                  className={`booking-card__slot${selectedSlot?.id === s.id ? " booking-card__slot--active" : ""}`}
                  onClick={() => setSelectedSlot(s)}
                >
                  {timeLabel}
                </button>
              );
            })
          ) : (
            <p className="booking-card__no-slots">
              No available times this day
            </p>
          )}
        </div>

        <Cta_Btn onClick={handleBook} disabled={!selectedSlot}>
          Book
        </Cta_Btn>
      </div>
    </div>
  );
}
