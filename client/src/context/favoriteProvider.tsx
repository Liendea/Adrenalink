import { useState, useEffect, useCallback } from "react";
import { FavoritesContext } from "./favoriteContext";
import { useAuth } from "@/hooks/useAuth";
import type { FavoriteEntry } from "@/types/types";

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
        favorites.find((f) =>
          type === "lesson" ? f.lessonId === id : f.schoolId === id,
        )?.id ?? null;

      if (existingId) {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/favorites/${existingId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!res.ok) {
          console.error("Kunde inte ta bort favorit:", res.status);
          return;
        }
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
        if (!res.ok || !data.favorite) {
          console.error("Kunde inte lägga till favorit:", data.message);
          return;
        }
        setFavorites((prev) => [...prev, data.favorite]);
      }
    },
    [favorites],
  );

  const isFavorited = (id: number, type: "lesson" | "school") =>
    favorites.some((f) =>
      type === "lesson" ? f.lessonId === id : f.schoolId === id,
    );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorited, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
