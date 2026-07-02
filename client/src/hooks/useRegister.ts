import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneCode: "",
    phoneNumber: "",
    passportNumber: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registrering misslyckades");
      }

      alert("Konto skapat! Nu kan du logga in.");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Något gick fel.";

      console.error("Fel vid registrering:", errorMessage);
      alert(errorMessage);
    }
  };

  return {
    step,
    formData,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  };
}
