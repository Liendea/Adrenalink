import { useParams } from "react-router-dom";
import LessonDetails from "@/pages/booking/components/lessonDetails/LessonDetails";
import DiscoveryMap from "@/components/map/DiscoveryMap";
import "./BookingPage.scss";
import Booking from "./components/booking/Booking";
import chevronLeft from "@/assets/icons/chevronLeft.svg";
import { useBookingLesson } from "@/hooks/useBookingLesson";
import Icon from "@/components/Icon";
import { useNavigate } from "react-router-dom";

export default function BookingPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { data: lesson, isLoading, isError } = useBookingLesson(lessonId);
  const navigate = useNavigate();
  if (isLoading) return <div>Laddar bokningssida...</div>;
  if (isError || !lesson) return <div>Kunde inte hitta lektionen.</div>;

  return (
    <section className="booking-section">
      <button
        className="booking-section__back"
        onClick={() => navigate("/explore")}
      >
        <Icon src={chevronLeft} /> Back
      </button>
      <div className="flex-column">
        <div className="flex-row">
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
      </div>
    </section>
  );
}
