import { useState } from "react";
import Icon from "@/components/Icon";
import ChevronLeft from "@/assets/icons/ChevronLeft.svg";
import ChevronRight from "@/assets/icons/ChevronRight.svg";

type DatePickerProps = {
  days: Date[];
  selectedDay: Date | null;
  onDayChange: (day: Date) => void;
};

// Hjälpfunktion – returnera måndagen för en given vecka
const getMonday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

// Generera 7 dagar från ett startdatum
const getWeekDays = (monday: Date): Date[] =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

export const DatePicker = ({
  days,
  selectedDay,
  onDayChange,
}: DatePickerProps) => {
  const [weekStart, setWeekStart] = useState<Date>(() =>
    getMonday(days[0] ?? new Date()),
  );

  const weekDays = getWeekDays(weekStart);

  const goToPrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };

  const goToNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  // Sätt med tillgängliga datum för snabb lookup
  const availableDates = new Set(days.map((d) => d.toDateString()));

  const month = weekDays[0].toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="booking__section__datepicker">
      <p className="booking__section__month">{month}</p>
      <div className="booking__section__days">
        <button className="booking__section__day-nav" onClick={goToPrevWeek}>
          <Icon src={ChevronLeft} />
        </button>

        {weekDays.map((day) => {
          const isSelected = selectedDay?.toDateString() === day.toDateString();
          const isAvailable = availableDates.has(day.toDateString());

          return (
            <button
              key={day.toDateString()}
              className={`booking__section__day
                ${isSelected ? " booking__section__day--active" : ""}
                ${!isAvailable ? " booking__section__day--unavailable" : ""}
              `}
              onClick={() => onDayChange(day)}
            >
              <span className="booking__section__day-short">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="booking__section__day-num">
                {day.getUTCDate()}
              </span>
            </button>
          );
        })}

        <button className="booking__section__day-nav" onClick={goToNextWeek}>
          <Icon src={ChevronRight} />
        </button>
      </div>
    </div>
  );
};
