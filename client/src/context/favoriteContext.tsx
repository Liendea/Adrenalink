import { createContext } from "react";
import type { Lesson, School } from "@/types/types";

type FavoriteEntry = {
  id: number;
  lessonId: number | null;
  schoolId: number | null;
  lesson?: Lesson | null;
  school?: School | null;
};

export type FavoritesContextType = {
  favorites: FavoriteEntry[];
  isFavorited: (id: number) => boolean;
  toggleFavorite: (id: number, type: "lesson" | "school") => Promise<void>;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
