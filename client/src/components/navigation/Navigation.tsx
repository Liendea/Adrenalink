import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NavLogo from "./NavLogo";
import Navigation_Actions from "./Navigation_Actions";
import Searchbar from "../searchbar/Searchbar";
import "./Navigation.scss";

export default function Navigation() {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const isInternalPage = !["/", "/login", "/register"].includes(
    location.pathname,
  );

  return (
    <nav
      className="navigation"
      style={{
        backgroundColor: isInternalPage ? "#f6f6f6" : "transparent",
        borderBottom: isInternalPage ? "1px solid lightgray" : "none",
      }}
    >
      <div className="navigation__wrapper">
        <NavLogo isInternalPage={isInternalPage} />
        {isInternalPage && (
          <div className="navigation__searchbar">
            <Searchbar />
          </div>
        )}
        <Navigation_Actions
          isAuthenticated={isAuthenticated}
          user={user}
          logout={logout}
        />
      </div>
      {isInternalPage && (
        <div className="navigation__searchbar-small">
          <Searchbar />
        </div>
      )}
    </nav>
  );
}
