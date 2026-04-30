import { useState } from "react";
import { ChevronLeft } from "../../../icons/ChevronLeft";
import { ChevronRight } from "../../../icons/ChevronRight";
import "./Calendar.scss";

// ─── Calendar ─────────────────────────────────────────────────────────────────

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type CalendarProps = {
  onClose: () => void;
};

export default function Calendar({ onClose }: CalendarProps) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(10); // 0-indexed: 10 = November
  const [startDay, setStartDay] = useState<number | null>(4);
  const [endDay, setEndDay] = useState<number | null>(8);

  const firstDay = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday=0 offset
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setStartDay(null);
    setEndDay(null);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
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
      } else setEndDay(day);
    }
  };

  const getDayClass = (day: number): string => {
    if (!startDay) return "";
    if (startDay && endDay) {
      if (day === startDay) return "calendar-dropdown__day--start";
      if (day === endDay) return "calendar-dropdown__day--end";
      if (day > startDay && day < endDay)
        return "calendar-dropdown__day--range";
    } else {
      if (day === startDay)
        return "calendar-dropdown__day--start calendar-dropdown__day--end";
    }
    return "";
  };

  // Build grid cells
  type Cell = { day: number; active: boolean };
  const cells: Cell[] = [];
  for (let i = 0; i < offset; i++) {
    cells.push({ day: daysInPrev - offset + 1 + i, active: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, active: true });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, active: false });
  }

  return (
    <div className="calendar-dropdown">
      <div className="calendar-dropdown__header">
        <button className="calendar-dropdown__nav-btn" onClick={prevMonth}>
          <ChevronLeft />
        </button>
        <span>
          {MONTHS[month]} {year}
        </span>
        <button className="calendar-dropdown__nav-btn" onClick={nextMonth}>
          <ChevronRight />
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
              cell.active ? getDayClass(cell.day) : "",
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
        <button className="calendar-dropdown__apply-btn" onClick={onClose}>
          Apply
        </button>
      </div>
    </div>
  );
}
