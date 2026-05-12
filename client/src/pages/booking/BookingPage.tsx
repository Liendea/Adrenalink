import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { LessonWithSlots } from "@/types/types";
import LessonDetails from "@/pages/booking/components/lessonDetails/LessonDetails";
import DiscoveryMap from "@/components/map/DiscoveryMap";
import "./BookingPage.scss";
import { SchoolInfo } from "./components/SchoolInfo";
import Booking from "./components/booking/Booking";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";

export default function BookingPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<LessonWithSlots | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/lesson/${lessonId}`,
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

  const { isFavorited, toggleFavorite } = useFavorites();
  const id = Number(lessonId);
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id, "lesson");
  };

  return (
    <div className="booking-page">
      <button
        className="card__fav"
        onClick={handleFavorite}
        aria-label={
          isFavorited(id) ? "Ta bort från favoriter" : "Lägg till i favoriter"
        }
      >
        <FavoriteButton favorited={isFavorited(id)} />
      </button>

      <SchoolInfo name={lesson.school?.name} location={lesson.location} />
      <div className="wrapper">
        <LessonDetails lesson={lesson} />
        <Booking lesson={lesson} allSlots={lesson.availableTimes} />
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
