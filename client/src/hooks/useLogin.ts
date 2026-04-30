import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Success:", data);

      login(data.token, data.user);

      const origin = location.state?.from || "/";
      navigate(origin);
    } catch (error) {
      // Vi kollar om error är en instans av Error-klassen
      const errorMessage =
        error instanceof Error ? error.message : "Något gick fel.";

      console.error("Fel vid registrering:", errorMessage);
      alert(errorMessage);
    }
  };

  return { handleSubmit, handleChange, setFormData, formData };
}
