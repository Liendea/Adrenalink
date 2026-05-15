import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type ProfileForm = {
  firstName: string;
  lastName: string;
  passportNo: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
};

export default function useEditProfile() {
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveProfile = async (form: ProfileForm) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) throw new Error("Kunde inte spara ändringar.");

      const data = await res.json();

      updateUser(data.user); // uppdatera context + localStorage
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Något gick fel.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { saveProfile, loading, error, success };
}
