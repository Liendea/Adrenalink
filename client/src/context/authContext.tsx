import { createContext } from "react";

export type User = {
  id: number;
  email: string;
  firstName: string;
  role: string;
};

export type AuthContextType = {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
