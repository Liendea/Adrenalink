// TimeSlotPicker.tsx
import Icon from "@/components/Icon";
import Sad_Smiley from "@/assets/icons/Sad_smiley.svg";
import type { AvailableTimeSlot } from "@/types/types";

type TimeSlotPickerProps = {
  slots: AvailableTimeSlot[];
  selectedSlotId?: number;
  onSelect: (slot: AvailableTimeSlot) => void;
};

export default function TimeSlotPicker({
  slots,
  selectedSlotId,
  onSelect,
}: TimeSlotPickerProps) {
  if (slots.length === 0) {
    return (
      <div className="booking__section__NA">
        <Icon src={Sad_Smiley} width={50} height={50} />
        <p className="booking__section__no-slots">
          No available times this day
        </p>
      </div>
    );
  }

  return (
    <div className="booking__section__slots">
      {slots.map((s) => (
        <button
          key={s.id}
          disabled={s.isBooked}
          className={`booking__section__slot
            ${selectedSlotId === s.id ? " booking__section__slot--active" : ""}
            ${s.isBooked ? " booking__section__slot--booked" : ""}
          `}
          onClick={() => !s.isBooked && onSelect(s)}
        >
          {new Date(s.startTime).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          })}
          {s.isBooked && <span> – Full</span>}
        </button>
      ))}
    </div>
  );
}
