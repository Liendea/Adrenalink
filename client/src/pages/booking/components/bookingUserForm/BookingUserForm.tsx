import { useForm } from "react-hook-form";
import "./BookingUserForm.scss";
import type { User } from "@/types/types";

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  passportNumber: string;
}

export function BookingUserForm({
  profile,
  onConfirm,
  submitting,
}: {
  profile: User;
  onConfirm: (data: BookingFormData) => void;
  submitting?: boolean;
}) {
  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      name: profile.firstName + " " + profile.lastName,
      email: profile.email,
      phone: profile.phoneCode + " " + profile.phoneNumber,
      passportNumber: profile.passportNumber,
    },
  });

  return (
    <form onSubmit={handleSubmit(onConfirm)} className="booking-user-form">
      <div className="booking-user-form__field">
        <label className="booking-user-form__label">Name</label>
        <input
          {...register("name", { required: true })}
          readOnly
          className="booking-user-form__input"
        />
      </div>

      <div className="booking-user-form__field">
        <label className="booking-user-form__label">Email</label>
        <input
          {...register("email", { required: true })}
          readOnly
          type="email"
          className="booking-user-form__input"
        />
      </div>

      <div className="booking-user-form__field">
        <label className="booking-user-form__label">Phone</label>
        <input
          {...register("phone", { required: true })}
          readOnly
          className="booking-user-form__input"
        />
      </div>

      <div className="booking-user-form__field">
        <label className="booking-user-form__label">Passport Number</label>
        <input
          {...register("passportNumber", { required: true })}
          readOnly
          className="booking-user-form__input"
        />
      </div>

      <p className="booking-user-form__subtitle">
        The data is automatically collected from your profile, if you want to
        change it, please update your profile first.
      </p>

      <button
        type="submit"
        className="booking-user-form__confirm-button"
        disabled={submitting}
      >
        {submitting ? "Confirming..." : "Confirm Booking"}
      </button>
    </form>
  );
}
