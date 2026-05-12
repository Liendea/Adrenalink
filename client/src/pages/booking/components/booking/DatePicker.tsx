// DatePicker.tsx
import Icon from "@/components/Icon";
import ChevronLeft from "@/assets/icons/ChevronLeft.svg";
import ChevronRight from "@/assets/icons/ChevronRight.svg";

const DAYS = [
  { short: "Mo", num: 5 },
  { short: "Tu", num: 6 },
  { short: "We", num: 7 },
  { short: "Th", num: 8 },
  { short: "Fr", num: 9 },
  { short: "Sa", num: 10 },
  { short: "Su", num: 11 },
];

interface DatePickerProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

export const DatePicker = ({ selectedDay, onDayChange }: DatePickerProps) => (
  <div className="booking__section__datepicker">
    <p className="booking__section__month">November</p>
    <div className="booking__section__days">
      <button className="booking__section__day-nav">
        <Icon src={ChevronLeft} />
      </button>
      {DAYS.map((day) => (
        <button
          key={day.num}
          className={`booking__section__day${selectedDay === day.num ? " booking__section__day--active" : ""}`}
          onClick={() => onDayChange(day.num)}
        >
          <span className="booking__section__day-short">{day.short}</span>
          <span className="booking__section__day-num">{day.num}</span>
        </button>
      ))}
      <button className="booking__section__day-nav">
        <Icon src={ChevronRight} />
      </button>
    </div>
  </div>
);
