import { useState } from "react";

import type { AvailableTimeSlot, LessonWithSlots } from "@/types/types";
import "./Booking.scss";
import Cta_Btn from "../../../../components/buttons/Cta_Btn";
import { DatePicker } from "./DatePicker";
import TimeSlotPicker from "./TimeSlotPicker";

type BookingProps = {
  lesson: LessonWithSlots;
  allSlots: AvailableTimeSlot[];
  onBook?: (lessonId: number, day: number, slot: AvailableTimeSlot) => void;
};

export default function BookingCard({
  lesson,
  allSlots,
  onBook,
}: BookingProps) {
  const [selectedDay, setSelectedDay] = useState<number>(/* initial state */);
  const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | null>(
    null,
  );

  const slotsForSelectedDay = allSlots.filter(
    (s) => new Date(s.startTime).getDate() === selectedDay && !s.isBooked,
  );

  return (
    <div className="booking__section">
      <h3 className="booking__section__title">Booking</h3>
      <DatePicker
        selectedDay={selectedDay ?? 0}
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

      <Cta_Btn
        onClick={() => {
          if (selectedDay !== undefined) {
            onBook?.(lesson.id, selectedDay, selectedSlot!);
          }
        }}
        disabled={!selectedSlot}
      >
        Book
      </Cta_Btn>
    </div>
  );
}
