import { useParams } from "react-router-dom";
import LessonDetails from "@/pages/booking/components/lessonDetails/LessonDetails";
import DiscoveryMap from "@/components/map/DiscoveryMap";
import "./BookingPage.scss";
import Booking from "./components/booking/Booking";
import { useBookingLesson } from "@/hooks/useBookingLesson";
import { useNavigate } from "react-router-dom";
import Back_Btn from "@/components/buttons/Back_Btn";

export default function BookingPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { data: lesson, isLoading, isError } = useBookingLesson(lessonId);
  const navigate = useNavigate();
  if (isLoading) return <div>Loading booking page...</div>;
  if (isError || !lesson) return <div>The lesson could not be found.</div>;

  return (
    <section className="booking-section">
      <Back_Btn onClick={() => navigate(-1)} />
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
