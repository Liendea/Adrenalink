import { useParams } from "react-router-dom";

import LessonDetails from "@/pages/booking/components/lessonDetails/LessonDetails";
import DiscoveryMap from "@/components/map/DiscoveryMap";
import "./BookingPage.scss";
import { SchoolInfo } from "./components/SchoolInfo";
import Booking from "./components/booking/Booking";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { useBookingLesson } from "@/hooks/useBookingLesson";

export default function BookingPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { data: lesson, isLoading, isError } = useBookingLesson(lessonId);
  const { isFavorited, toggleFavorite } = useFavorites();

  if (isLoading) return <div>Laddar bokningssida...</div>;
  if (isError || !lesson) return <div>Kunde inte hitta lektionen.</div>;

  const id = Number(lessonId);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id, "lesson");
  };

  return (
    <section className="booking-section">
      <div className="booking-section__header-row">
        <SchoolInfo name={lesson.school?.name} location={lesson.location} />
        <button
          className="booking-section__fav"
          onClick={handleFavorite}
          aria-label={
            isFavorited(id) ? "Ta bort från favoriter" : "Lägg till i favoriter"
          }
        >
          <FavoriteButton favorited={isFavorited(id)} />
        </button>
      </div>
      <div className="wrapper">
        <LessonDetails lesson={lesson} />
        <Booking lesson={lesson} allSlots={lesson.availableTimes} />
      </div>
      <div className="booking-section__map">
        {lesson.lat && lesson.lng ? (
          <DiscoveryMap variant="activities" items={[lesson]} />
        ) : (
          <div className="booking-section__map-placeholder">
            <p>No location available</p>
          </div>
        )}
      </div>
    </section>
  );
}
