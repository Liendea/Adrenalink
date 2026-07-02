import { useNavigate, useParams, useLocation } from "react-router";
import { BookingSummaryCard } from "./components/bookingSummaryCard/BookingSummaryCard";
import {
  BookingUserForm,
  type BookingFormData,
} from "./components/bookingUserForm/BookingUserForm";
import { useAuth } from "@/hooks/useAuth";
import { getLessonImage } from "@/utils/lessonImage";
import type { AvailableTimeSlot, Lesson } from "@/types/types";
import "./BookingPage.scss";
import Icon from "@/components/Icon";
import Question from "@/assets/icons/Question.svg";
import { useCreateBooking } from "@/hooks/useCreateBooking";

export function BookingPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: submitBooking, isPending, error } = useCreateBooking();

  const lesson = location.state?.lesson as Lesson | undefined;
  if (!lesson) {
    throw new Error(
      `No lesson data for lessonId=${lessonId}. Navigate via lesson card, not direct URL.`,
    );
  }

  const selectedDay = location.state?.selectedDay as Date | undefined;
  const selectedSlot = location.state?.selectedSlot as
    | AvailableTimeSlot
    | undefined;

  const lessonForSummary = {
    ...lesson,
    imageUrl: getLessonImage(lesson),
    date: selectedDay
      ? new Date(selectedDay).toLocaleDateString("sv-SE")
      : lesson.date,
    time: selectedSlot
      ? new Date(selectedSlot.startTime).toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : lesson.time,
  };

  if (!user) return null;

  const handleConfirm = (formData: BookingFormData) => {
    submitBooking(
      { lessonId: lesson.id, slotId: selectedSlot!.id, ...formData },
      {
        onSuccess: () => navigate(`/profile/bookings`),
      },
    );
  };

  return (
    <div className="booking-page">
      <div className="booking-page__form-column">
        <h1 className="booking-page__title">Confirm Your Booking</h1>
        <p className="booking-page__subtitle">
          Please review your booking details before confirming.{" "}
        </p>

        <div className="booking-page__question-wrapper">
          <Icon src={Question} className="booking-page__question-icon" />
          <div className="booking-page__tooltip">
            The school collects this information to contact you, manage
            rebookings or cancellations due to weather conditions, and process
            insurance coverage for your lesson. You can only make a booking if
            you have provided your personal information. If you have any
            questions, please contact the school directly.
          </div>
        </div>

        <BookingUserForm
          profile={user}
          onConfirm={handleConfirm}
          submitting={isPending}
        />
        {error && <p className="booking-page__error">{error.message}</p>}
      </div>

      <div className="booking-page__summary-column">
        <BookingSummaryCard lesson={lessonForSummary} />
      </div>
    </div>
  );
}
