import { useState } from "react";

import type { AvailableTimeSlot, LessonWithSlots } from "@/types/types";
import "./Booking.scss";
import Cta_Btn from "@/components/buttons/Cta_Btn";
import { DatePicker } from "./DatePicker";
import TimeSlotPicker from "./TimeSlotPicker";

type BookingProps = {
  lesson: LessonWithSlots;
  allSlots: AvailableTimeSlot[];
  onBook?: (lessonId: number, day: Date, slot: AvailableTimeSlot) => void;
};

export default function BookingCard({
  lesson,
  allSlots,
  onBook,
}: BookingProps) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | null>(
    null,
  );

  // Generera unika dagar från faktiska slots
  const availableDays = [
    ...new Map(
      allSlots.map((s) => {
        const date = new Date(s.startTime);
        // Använd UTC-datum som nyckel
        const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
        return [key, date];
      }),
    ).values(),
  ].sort((a, b) => a.getTime() - b.getTime());

  // Filtrera på hela datumet istället för bara dag-numret
  const slotsForSelectedDay = allSlots.filter((s) => {
    const slotDate = new Date(s.startTime);
    return (
      selectedDay &&
      slotDate.getUTCFullYear() === selectedDay.getUTCFullYear() &&
      slotDate.getUTCMonth() === selectedDay.getUTCMonth() &&
      slotDate.getUTCDate() === selectedDay.getUTCDate()
    );
  });

  return (
    <div className="booking__section">
      <h3 className="booking__section__title">Booking</h3>
      <div className="booking__section__date-time-picker">
        <DatePicker
          days={availableDays}
          selectedDay={selectedDay}
          onDayChange={(d) => {
            setSelectedDay(d);
            setSelectedSlot(null);
          }}
        />

        <p className="booking__section__slots-label">Pick a time:</p>
        <TimeSlotPicker
          slots={slotsForSelectedDay}
          selectedSlotId={selectedSlot?.id}
          onSelect={setSelectedSlot}
        />
      </div>
      <Cta_Btn
        onClick={() => {
          if (selectedDay && selectedSlot) {
            onBook?.(lesson.id, selectedDay, selectedSlot);
          }
        }}
        disabled={!selectedSlot}
      >
        Book
      </Cta_Btn>
    </div>
  );
}
