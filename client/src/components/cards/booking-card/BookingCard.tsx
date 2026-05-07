import { useState } from "react";

import type { AvailableTimeSlot, LessonWithSlots } from "@/types/types";
import "./BookingCard.scss";
import Cta_Btn from "../../buttons/Cta_Btn";
import image from "@/assets/image.png";
import { DatePicker } from "./DatePicker";
import { BookingDetails } from "./BookingDetails";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { SchoolInfo } from "./SchoolInfo";
import BookingHeader from "./BookingHeader";

type BookingCardProps = {
  lesson: LessonWithSlots;
  allSlots: AvailableTimeSlot[];
  onBook?: (lessonId: number, day: number, slot: AvailableTimeSlot) => void;
  onClose?: () => void;
};

export default function BookingCard({
  lesson,
  allSlots,
  onBook,
  onClose,
}: BookingCardProps) {
  const [selectedDay, setSelectedDay] = useState<number>(/* initial state */);
  const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | null>(
    null,
  );

  const slotsForSelectedDay = allSlots.filter(
    (s) => new Date(s.startTime).getDate() === selectedDay && !s.isBooked,
  );

  return (
    <div className="booking-card">
      <BookingHeader image={image} onClose={onClose} />

      <div className="booking-card__body">
        <BookingDetails lesson={lesson} />
        <SchoolInfo name={lesson.school?.name} location={lesson.location} />

        <hr className="booking-card__divider" />

        <h3 className="booking-card__section-title">Booking</h3>
        <DatePicker
          selectedDay={selectedDay}
          onDayChange={(d) => {
            setSelectedDay(d);
            setSelectedSlot(null);
          }}
        />

        <p className="booking-card__slots-label">Pick a time:</p>
        <TimeSlotPicker
          slots={slotsForSelectedDay}
          selectedSlotId={selectedSlot?.id}
          onSelect={setSelectedSlot}
        />

        <Cta_Btn
          onClick={() => onBook?.(lesson.id, selectedDay, selectedSlot!)}
          disabled={!selectedSlot}
        >
          Book
        </Cta_Btn>
      </div>
    </div>
  );
}
