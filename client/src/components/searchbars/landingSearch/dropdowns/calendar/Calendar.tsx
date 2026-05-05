import { useState } from "react";
import ChevronLeft from "@/assets/icons/ChevronLeft.svg";
import ChevronRight from "@/assets/icons/ChevronRight.svg";
import "./Calendar.scss";
import type { DateRange } from "@/components/searchbars/landingSearch/Searchbar";
import Icon from "@/components/Icon";

// Importera konstanter och funktioner från vår nya hjälpfil
import {
  MONTHS,
  WEEKDAYS,
  getCalendarCells,
  getDayClass,
} from "@/utils/CalendarUtils";

type CalendarProps = {
  onClose: () => void;
  setSelectedDates: (dates: DateRange) => void;
};

export default function Calendar({ onClose, setSelectedDates }: CalendarProps) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(10); // 0-indexed: 10 = November
  const [startDay, setStartDay] = useState<number | null>(4);
  const [endDay, setEndDay] = useState<number | null>(8);

  // Generera cellerna direkt i renderingen baserat på year och month
  const cells = getCalendarCells(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
    setStartDay(null);
    setEndDay(null);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
    setStartDay(null);
    setEndDay(null);
  };

  const handleDayClick = (day: number) => {
    if (!startDay || (startDay && endDay)) {
      setStartDay(day);
      setEndDay(null);
    } else {
      if (day < startDay) {
        setEndDay(startDay);
        setStartDay(day);
      } else {
        setEndDay(day);
      }
    }
  };

  const handleApply = () => {
    if (!startDay) {
      onClose();
      return;
    }

    const startDate = new Date(year, month, startDay);
    const endDate = endDay ? new Date(year, month, endDay) : startDate;

    setSelectedDates({ startDate, endDate });
    onClose();
  };

  return (
    <div className="calendar-dropdown">
      <div className="calendar-dropdown__header">
        <button className="calendar-dropdown__nav-btn" onClick={prevMonth}>
          <Icon src={ChevronLeft} />
        </button>
        <span>
          {MONTHS[month]} {year}
        </span>
        <button className="calendar-dropdown__nav-btn" onClick={nextMonth}>
          <Icon src={ChevronRight} />
        </button>
      </div>

      <div className="calendar-dropdown__weekdays">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="calendar-dropdown__days">
        {cells.map((cell, i) => (
          <button
            key={i}
            className={[
              "calendar-dropdown__day",
              !cell.active ? "calendar-dropdown__day--inactive" : "",
              cell.active ? getDayClass(cell.day, startDay, endDay) : "",
            ].join(" ")}
            onClick={() => cell.active && handleDayClick(cell.day)}
          >
            {cell.day}
          </button>
        ))}
      </div>

      <div className="calendar-dropdown__actions">
        <button className="calendar-dropdown__cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="calendar-dropdown__apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
}
