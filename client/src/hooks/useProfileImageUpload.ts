import { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";

const compressImage = (file: File, maxWidth = 400): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.7)); // 70% kvalitet
    };

    img.src = url;
  });
};

export default function useProfileImageUpload() {
  const { user, updateUser } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => inputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      const base64 = await compressImage(file);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/profile-image`,
        {
          method: "PATCH",
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

  return { user, inputRef, triggerFileInput, handleFileChange };
}
