import { useState, useEffect, useCallback } from "react";
import { FavoritesContext } from "./favoriteContext";
import { useAuth } from "@/hooks/useAuth";

type FavoriteEntry = {
  id: number;
  lessonId: number | null;
  schoolId: number | null;
};

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteEntry[]>([]);

  // Hämta favoriter när användaren loggar in
  useEffect(() => {
    if (!isAuthenticated || !user) {
      const timer = setTimeout(() => setFavorites([]), 0);
      return () => clearTimeout(timer);
    }

    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/favorites`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await res.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error("Kunde inte hämta favoriter:", err);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user]);

  const toggleFavorite = useCallback(
    async (id: number, type: "lesson" | "school") => {
      const token = localStorage.getItem("token");

      // Flyttad inuti useCallback
      const existingId =
        favorites.find((f) => f.lessonId === id || f.schoolId === id)?.id ??
        null;

      if (existingId) {
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/favorites/${existingId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setFavorites((prev) => prev.filter((f) => f.id !== existingId));
      } else {
        const body = type === "lesson" ? { lessonId: id } : { schoolId: id };
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          },
        );
        const data = await res.json();
        setFavorites((prev) => [...prev, data.favorite]);
      }
    },
    [favorites],
  );

  const isFavorited = (id: number) =>
    favorites.some((f) => f.lessonId === id || f.schoolId === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorited, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
