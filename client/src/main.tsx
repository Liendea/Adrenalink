import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 1. Importera BrowserRouter
import App from "./App";
import "./styles/global.scss";
import { AuthProvider } from "./context/authProvider";
import { FavoritesProvider } from "./context/favoriteProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
