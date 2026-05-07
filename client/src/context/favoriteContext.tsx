import { createContext } from "react";

type FavoritesContextType = {
  isFavorited: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
