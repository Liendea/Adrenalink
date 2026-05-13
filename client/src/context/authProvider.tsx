import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./authContext";
import type { User } from "@/types/types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch (error) {
        console.error("Fel vid parsing av user från localStorage:", error);
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  });

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
