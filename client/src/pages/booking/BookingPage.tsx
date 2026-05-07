import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AvailableTimeSlot } from "@/types/types";
import BookingCard from "@/components/cards/BookingCard";
import "./BookingPage.scss";

export default function BookingPage() {
  const { slotId } = useParams<{ slotId: string }>();
  const [slot, setSlot] = useState<AvailableTimeSlot | null>(null);
  const [allSlots, setAllSlots] = useState<AvailableTimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hämta den specifika sloten först
        const slotRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/slots/${slotId}`,
        );
        const slotData: AvailableTimeSlot = await slotRes.json();
        setSlot(slotData);

        // Hämta sedan alla slots för samma lektion
        const allSlotsRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/slots?lessonId=${slotData.lesson.id}`,
        );
        const allSlotsData = await allSlotsRes.json();
        setAllSlots(allSlotsData);
      } catch (error) {
        console.error("Kunde inte hämta bokningsinfo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slotId) fetchData();
  }, [slotId]);

  if (loading) return <div>Laddar bokningssida...</div>;
  if (!slot) return <div>Kunde inte hitta den sökta aktiviteten.</div>;

  return (
    <div className="booking-page">
      <BookingCard slot={slot} allSlots={allSlots} />
    </div>
  );
}
