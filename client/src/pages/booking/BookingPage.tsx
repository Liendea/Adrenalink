import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AvailableTimeSlot } from "@/types/types";
import BookingCard from "@/components/cards/BookingCard";
import "./BookingPage.scss";
export default function BookingPage() {
  // slotId matchar exakt det namn vi gav routen i Steg 1 (:slotId)
  const { slotId } = useParams<{ slotId: string }>();

  const [slot, setSlot] = useState<AvailableTimeSlot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecificSlot = async () => {
      try {
        // Hämta info om just den här specifika tidsboken från din backend
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/slots/${slotId}`,
        );
        const data = await response.json();
        setSlot(data);
      } catch (error) {
        console.error("Kunde inte hämta bokningsinfo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slotId) fetchSpecificSlot();
  }, [slotId]);

  if (loading) return <div>Laddar bokningssida...</div>;
  if (!slot) return <div>Kunde inte hitta den sökta aktiviteten.</div>;

  return (
    <div className="booking-page">
      <BookingCard slot={slot} />
    </div>
  );
}
