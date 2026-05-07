import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { LessonWithSlots } from "@/types/types";
import BookingCard from "@/components/cards/booking-card/BookingCard";
import DiscoveryMap from "@/components/map/DiscoveryMap";
import "./BookingPage.scss";

export default function BookingPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<LessonWithSlots | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/slots/lesson/${lessonId}`,
        );
        if (!res.ok) {
          console.error("Fetch misslyckades:", res.status);
          return;
        }
        const data = await res.json();
        setLesson(data);
      } catch (error) {
        console.error("Kunde inte hämta bokningsinfo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) fetchData();
  }, [lessonId]);

  if (loading) return <div>Laddar bokningssida...</div>;
  if (!lesson) return <div>Kunde inte hitta lektionen.</div>;

  return (
    <div className="booking-page">
      <div className="booking-page__card">
        <BookingCard lesson={lesson} allSlots={lesson.availableTimes} />
      </div>
      <div className="booking-page__map">
        {lesson.lat && lesson.lng ? (
          <DiscoveryMap variant="activities" items={[lesson]} />
        ) : (
          <div className="booking-page__map-placeholder">
            <p>No location available</p>
          </div>
        )}
      </div>
    </div>
  );
}
