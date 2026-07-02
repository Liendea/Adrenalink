import { createContext } from "react";
import type { FavoriteEntry } from "@/types/types";

export type FavoritesContextType = {
  favorites: FavoriteEntry[];
  isFavorited: (id: number, type: "lesson" | "school") => boolean;
  toggleFavorite: (id: number, type: "lesson" | "school") => Promise<void>;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
