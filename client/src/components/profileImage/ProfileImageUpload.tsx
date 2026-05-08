import { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import "./ProfileImageUpload.scss";

export default function ProfileImageUpload() {
  const { user, updateUser } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Konvertera till base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/profile-image`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, imageBase64: base64 }),
          },
        );

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        updateUser(data.user);
      } catch (err) {
        console.error("Kunde inte ladda upp bild:", err);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-image-upload">
      <div
        className="profile-image-upload__avatar"
        onClick={() => inputRef.current?.click()}
      >
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-image-upload__img"
          />
        ) : (
          <span className="profile-image-upload__initials">
            {user?.firstName[0]}
            {user?.lastName[0]}
          </span>
        )}
        <button className="profile-image-upload__add" type="button">
          +
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="profile-image-upload__input"
        onChange={handleFileChange}
      />
    </div>
  );
}
